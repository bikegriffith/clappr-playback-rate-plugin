import {Events, Styler, UICorePlugin, template} from 'clappr'
import pluginHtml from './public/playback-rate-selector.html'
import pluginStyle from './public/style.scss'

const DEFAULT_PLAYBACK_RATES = [
  {value: '0.5', label: '0.5x'},
  {value: '1.0', label: '1x'},
  {value: '2.0', label: '2x'}
];

export default class PlaybackRatePlugin extends UICorePlugin {

  static get version() { return VERSION }

  get name() { return 'playback_rate'; }
  get template() { return template(pluginHtml); }

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

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this.reload)
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render)
  }

  unBindEvents() {
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED)
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED)
  }

  reload() {
    this.unBindEvents()
    this.bindEvents()
  }

  shouldRender() {
    if (!this.core.getCurrentContainer()) {
      return false;
    }

    var currentPlayback = this.core.getCurrentPlayback();
    window.playback = currentPlayback;
    if (currentPlayback.tagName != 'video' && currentPlayback.tagName != 'audio') {
      //console.warn('PlaybackRatePlugin#shouldRender: Cannot affect rate for playback', currentPlayback);
      return false;
    }

    return true;
  }

  render() {
    //console.log('PlaybackRatePlugin#render()');
    this.playbackRates = DEFAULT_PLAYBACK_RATES;
    if (!this.selectedRate) {
      this.selectedRate = '1.0';
    }

    if (this.shouldRender()) {
      var t = template(pluginHtml);
      var html = t({playbackRates: this.playbackRates, title: this.getTitle()});
      this.$el.html(html);

      var style = Styler.getStyleFor(pluginStyle, {baseUrl: this.core.options.baseUrl})
      this.$el.append(style)

      this.core.mediaControl.$('.media-control-right-panel').append(this.el)
      this.updateText()
    }

    return this
  }

  onRateSelect(event) {
    //console.log('onRateSelect', event.target);
    let rate = event.target.dataset.playbackRateSelect;

    // Set <video playbackRate="..."
    this.core.$el.find('video').get(0).playbackRate = rate;

    this.selectedRate = rate;
    this.updateText();
    this.toggleContextMenu();

    event.stopPropagation();
    return false;
  }

  onShowMenu(event) {
    this.toggleContextMenu()
  }

  toggleContextMenu() {
    this.$('.playback_rate ul').toggle()
  }

  setActiveListItem(rateValue) {
    this.$(`a`).removeClass('active');
    this.$(`a[data-playback-rate-select="${rateValue}"`).addClass('active');
  }

  buttonElement() {
    return this.$('.playback_rate button');
  }

  getTitle() {
    let title = this.selectedRate;
    this.playbackRates.forEach((r) => {
      if (r.value == this.selectedRate) {
        title = r.label;
      }
    });
    return title;
  }

  updateText() {
    this.buttonElement().text(this.getTitle())
    this.setActiveListItem(this.selectedRate);
  }
}
