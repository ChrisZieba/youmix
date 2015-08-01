# YouMix

YouMix is a Chrome extension to add audio filters to YouTube videos. **Why?** If you listen to a lot of music through YouTube, every now and then you may wonder what certain songs sound like with filters applied. It's a fun extension if you're interested in getting a different perspective from a song. The extension loads in any [YouTube](https://youtube.com) page with an HTML5 video player in the DOM.

## Screenshots

![YouMix](https://raw.githubusercontent.com/ChrisZieba/youmix/master/screenshots/youmix4.png)  

![YouMix](https://raw.githubusercontent.com/ChrisZieba/youmix/master/screenshots/youmix2.png)

### Presets
- Biquad Filter
 - The [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) interface represents a simple low-order filter.
- Distortion
  - The [WaveShaperNode](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode) interface represents a non-linear distorter.
- Compressor
  - The [DynamicsCompressorNode](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode) interface provides a compression effect, which lowers the volume of the loudest parts of the signal in order to help prevent clipping and distortion that can occur when multiple sounds are played and multiplexed together at once.

## TODO

- More audio node filters
- Add node chaining for enhanced effects
- Lots of other stuff

## LICENSE

The MIT License (MIT)  
Copyright (c) 2015 Chris Zieba