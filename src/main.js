import {Events, Styler, UICorePlugin, template} from 'clappr'
import pluginHtml from './public/playback-rate-selector.html'
import pluginStyle from './public/style.scss'

const AUTO = -1

export default class PlaybackRatePlugin extends UICorePlugin {

  static get version() { return VERSION }

  get name() { return 'playback_rate' }
  get template() { 
    console.log('html', pluginHtml);
    try {
      return template(pluginHtml);
    } catch(e) {
      console.error(e);
    }
  }

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
      console.warn('playback rate plugin, no container');
      return false;
    }

    var currentPlayback = this.core.getCurrentPlayback()
    if (!currentPlayback) {
      console.warn('playback rate plugin, no playback');
      return false
    }

    console.warn('playback rate plugin', currentPlayback);
    // TODO: is HTML5?
    return true
  }

  render() {

    this.playbackRates = [
      {value: '0.5', label: '0.5x'},
      {value: '1.0', label: '1x'},
      {value: '2.0', label: '2x'}
    ];

    if (this.shouldRender()) {
      console.log('playback rate plugin rendering');
      var style = Styler.getStyleFor(pluginStyle, {baseUrl: this.core.options.baseUrl})
      console.log('style', style);

      try {
        console.log('trying html', pluginHtml);
        let t = template(pluginHtml);
        console.log('created template object', t);
        let html = t({'playbackRates':this.playbackRates, 'title': this.getTitle()});
        console.log('rendered', html);
        this.$el.html(html);
        console.log('appended html');
      } catch(e) {
        console.error(e);
      }
      this.$el.append(style)
      console.log('appended style');
      console.log('this.$el', this.$el);
      console.log('this.el', this.el);
      this.core.mediaControl.$('.media-control-right-panel').append(this.el)
      console.log('appended element');
      //this.updateText(this.selectedLevelId)
    }
    return this
  }

  findLevelBy(id) {
    var foundLevel
    this.levels.forEach((level) => { if (level.id === id) {foundLevel = level} })
    return foundLevel
  }

  changeLevelLabelBy(id, newLabel) {
    this.levels.forEach((level, index) => {
      if (level.id === id) {
        this.levels[index].label = newLabel
      }
    })
  }

  onRateSelect(event) {
    let rate = event.target.dataset.playbackRateSelect;
    console.log('selected rate', rate);

    this.core.$el.find('video').get(0).playbackRate = rate;

    /*
    this.selectedLevelId = parseInt(event.target.dataset.levelSelectorSelect, 10)
    this.core.getCurrentPlayback().currentLevel = this.selectedLevelId

    this.updateText(this.selectedLevelId)
    */
    this.toggleContextMenu()

    event.stopPropagation()
    return false
  }

  onShowMenu(event) {
    this.toggleContextMenu()
  }

  toggleContextMenu() {
    this.$('.playback_rate ul').toggle()
  }

  setActiveListItem(level) {
    console.log(this.$('a'));
    this.$(`a`).removeClass('active');
    this.$(`a[data-playback-rate-select="${level}"`).addClass('active');
    console.log(this.$('a'));
  }

  buttonElement() {
    return this.$('.playback_rate button')
  }

  getTitle() {
    return '1x';
    //return (this.core.options.levelSelectorConfig || {}).title
  }

  updateText(level) {
    if (level === AUTO) {
      var playbackLevel = this.core.getCurrentPlayback().currentLevel;
      var label = (this.findLevelBy(playbackLevel) || {}).label
      if (label) {
        this.buttonElement().text('AUTO (' + label + ')')
      } else {
        this.buttonElement().text('AUTO');
      }
    } else {
      var label = (this.findLevelBy(level) || {}).label
      this.buttonElement().text(label)
    }
    this.setActiveListItem(level);
  }
}
