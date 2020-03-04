import {Events, Styler, UICorePlugin, template} from 'clappr'
import pluginHtml from './public/playback-rate-selector.html'
import pluginStyle from './public/style.scss'

const DEFAULT_PLAYBACK_RATES = [
  {value: 0.5, label: '0.5x'},
  {value: 0.75, label: '0.75x'},
  {value: 1, label: 'Normal'},
  {value: 1.5, label: '1.5x'},
  {value: 2, label: '2x'}
]

const DEFAULT_PLAYBACK_RATE = 1
const DEFAULT_PLAYBACK_RATE_SUFFIX = 'x' // Used by getTitle method

export default class PlaybackRatePlugin extends UICorePlugin {
  get name() { return 'playback_rate' }
  get template() { return template(pluginHtml) }

  get attributes() {
    return {
      'class': this.name,
      'data-playback-rate-select': ''
    }
  }

  get events() {
    return {
      'click [data-playback-rate-select]': 'onRateSelect',
      'click [data-playback-rate-button]': 'onShowMenu'
    }
  }

  get container() {
    return this.core.activeContainer
      ? this.core.activeContainer
      : this.core.mediaControl.container
  }

  get playback() {
    return this.core.activePlayback
      ? this.core.activePlayback
      : this.core.getCurrentPlayback()
  }

  bindEvents() {
    if (Events.CORE_ACTIVE_CONTAINER_CHANGED)
      this.listenTo(this.core, Events.CORE_ACTIVE_CONTAINER_CHANGED, this.reload)
    else
      this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.reload)

    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render)
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_HIDE, this.hideContextMenu)
  }

  getExternalInterface() {
    return {
      getPlaybackRate: this.getSelectedRate,
      setPlaybackRate: this.setSelectedRate
    }
  }

  reload() {
    this.stopListening()
    // Ensure it stop listening before rebind events (avoid duplicate events)
    process.nextTick(() => {
      this.bindEvents()
    })
  }

  shouldRender() {
    return this.container && (
      this.playback.tagName === 'video'
      || this.playback.tagName === 'audio'
    )
  }

  render() {
    if (! this.shouldRender())
      return this

    const cfg = this.core.options.playbackRateConfig || {}
    this.playbackRates = cfg.options || DEFAULT_PLAYBACK_RATES
    this.selectedRate = cfg.defaultValue || DEFAULT_PLAYBACK_RATE
    this.rateSuffix = cfg.rateSuffix || DEFAULT_PLAYBACK_RATE_SUFFIX

    let t = template(pluginHtml)
    let html = t({playbackRates: this.playbackRates, title: this.getTitle()})
    this.$el.html(html)

    let style = Styler.getStyleFor(pluginStyle, {baseUrl: this.core.options.baseUrl})
    this.$el.append(style)

    this.core.mediaControl.$('.media-control-right-panel').append(this.el)
    this.updateText()

    return this
  }

  onRateSelect(event) {
    event.stopPropagation()
    let rate = event.target.dataset.playbackRateSelect // data-playback-rate-select
    this.setSelectedRate(rate)
    this.toggleContextMenu()
    return false
  }

  onShowMenu() {
    this.toggleContextMenu()
  }

  toggleContextMenu() {
    this.$('.playback_rate ul').toggle()
  }

  hideContextMenu() {
    this.$('.playback_rate ul').hide()
  }

  toNumber(value) {
    value = Number(value)
    // Fallback to default playback rate if cannot be converted
    return isNaN(value) ? DEFAULT_PLAYBACK_RATE : value
  }

  setSelectedRate(rate) {
    rate = this.toNumber(rate)
    this.playback.el.playbackRate = rate
    this.selectedRate = rate
    this.updateText()
  }

  getSelectedRate() {
    return this.selectedRate
  }

  setActiveListItem(rateValue) {
    this.$('a').removeClass('active')
    this.$(`a[data-playback-rate-select="${rateValue}"]`).addClass('active')
  }

  buttonElement() {
    return this.$('.playback_rate button')
  }

  getTitle() {
    let rate = this.selectedRate

    for (const i in this.playbackRates) {
      if (this.playbackRates[i].value == rate)
        return this.playbackRates[i].label
    }

    // Unknown rate formatted title
    return rate + this.rateSuffix
  }

  updateText() {
    this.buttonElement().text(this.getTitle())
    this.setActiveListItem(this.selectedRate)
  }
}
