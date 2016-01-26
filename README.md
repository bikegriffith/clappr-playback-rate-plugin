# Clappr Playback Rate Plugin

<img src="https://raw.githubusercontent.com/bikegriffith/clappr-playback-rate-plugin/master/screenshot.png"/>

## Usage

```
npm install --save clappr-playback-rate-plugin
```

Add both Clappr and Playback Rate plugin scripts:

```html
<head>
  <script type="text/javascript" src="http://cdn.clappr.io/latest/clappr.min.js"></script>
  <script type="text/javascript" src="dist/clappr-playback-rate-plugin.js"></script>
</head>
```
or
```javascript
import Clappr from 'clappr';
import PlaybackRatePlugin from 'clappr-playback-rate-plugin';
```

Then just add `PlaybackRatePlugin` into the list of plugins of your player instance:

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.m3u8",
  plugins: {
    'core': [PlaybackRatePlugin]
  }
});
```

You can also customize the labels and title:

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.m3u8",
  plugins: {
    'core': [PlaybackRatePlugin]
  },
  playbackRateConfig: {
    defaultValue: '1.0',
    options: [
        {value: '0.5', label: '0.5x'},
        {value: '1.0', label: '1x'},
        {value: '2.0', label: '2x'},
    ]
  },
});
```

## Compatibility

This works by settings the `playbackRate` property of the `<video>` element; accordingly, it does
not work for the Flash playback.


## Changelog

#### v0.1.1 - Bugfix on external clappr dependency
#### v0.1.0 - Initial release
