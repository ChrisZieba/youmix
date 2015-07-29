/*
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Chris Zieba (zieba.chris@gmail.com)
 */

$(document).ready(function() {
  'use strict';

  // Only works if the video player has the needed HTML5 class
  var player = $("video.html5-main-video")[0];

  // Nothing to do if the youtube player does not exist
  if (!player) {
    return;
  }

  var context = new AudioContext();
  var source = context.createMediaElementSource(player);
  source.connect(context.destination);

  // Set up the different audio nodes we will use for the app
  var analyser = context.createAnalyser();
  var distortion = context.createWaveShaper();
  var gainNode = context.createGain();
  var biquadFilter = context.createBiquadFilter();
  var convolver = context.createConvolver();
  var oscillator = context.createOscillator();
  var compressor = context.createDynamicsCompressor();

  // Load the template from source
  $.get(chrome.extension.getURL("src/youmix.html"), function(data) {
    $('#watch-header').after(data);

    // Add the range slider
    $('input[type="range"]').rangeslider({
      polyfill: false,
      rangeClass: 'rangeslider',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle'
    });
  });

  // Listen for changes to the presets
  $('body').on('change', "#ym-presets", function() {
    var preset = $(this).val();

    // Hide all the options
    $('.ym-node-group').hide();

    // Show the set of options matching the preset selected
    if (preset !== 'normal') {
      $("div[data-node-group='" + preset +"']").show();
    }

    // Load the filter
    presets(preset);
  });

  // Listen for changes to the options
  $('body').on('change', ".ym-node-group input[type='range'], .ym-node-group select", function() {
    var value = $(this).val();
    var node = $(this).data('node');
    var property = $(this).data('node-property');

    switch (node) {
      case 'biquadfilter':
        if (property === 'type') {
          biquadFilter.type = $(this).val()
        } else {
          biquadFilter[property].value = value;
        }
        
        break;

      case 'compressor':
        compressor[property].value = value;
        break;

      case 'oscillator':
        oscillator[property].value = value;
        break;

      case 'distortion':
        if (property === 'amount') {
          value = parseInt(value, 10);
          distortion.curve = makeDistortionCurve(value);
        } else if (property === 'oversample') {
          distortion.oversample = value;
        }
        break;
    }
  });

  function presets(preset) {
    source.disconnect();

    switch (preset) {
      case 'normal':
        source.connect(context.destination);
        break;

      /* 
        The BiquadFilterNode interface represents a simple low-order filter. 
      */
      case 'biquadfilter':
        source.connect(biquadFilter);
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.value = 50;
        biquadFilter.detune.value = 100;
        biquadFilter.Q.value = 10;

        // Connect to output
        biquadFilter.connect(context.destination);
        break;

      /*
        The DynamicsCompressorNode interface provides a compression effect, 
        which lowers the volume of the loudest parts of the signal in order to 
        help prevent clipping and distortion that can occur when multiple sounds
        are played and multiplexed together at once. 
      */
      case 'compressor':
        // Connect the source node to the destination
        source.connect(compressor);

        // These are the default values
        compressor.threshold.value = -50;
        compressor.knee.value = 40;
        compressor.ratio.value = 12;
        compressor.reduction.value = -20;
        compressor.attack.value = 0;
        compressor.release.value = 0.25;

        // Connect to output
        compressor.connect(context.destination);
        break;

      case 'oscillator':
        source.connect(oscillator);
        oscillator.type = 'sine';

        // Value in hertz
        oscillator.frequency.value = 2;
        //oscillator.start();

        // Connect to output
        oscillator.connect(context.destination);

        oscillator.start();

        break;

      /*
        The WaveShaperNode interface represents a non-linear distorter.
      */
      case 'distortion':
        // Connect the source node to the destination
        source.connect(distortion);

        // These are the default values
        distortion.oversample = 'none';
        distortion.curve = makeDistortionCurve(50);

        // Connect to output
        distortion.connect(context.destination);
        break;
    }
  }

  /* 
    Distortion curves are not the easiest thing to work out, and you will 
    probably need to look around to find such algorithms. We found the below 
    distortion curve code on Stack Overflow.
  */
  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50;
    var samples = 44100;
    var curve = new Float32Array(samples);
    var deg = Math.PI / 180;
    var x;

    for (var i = 0; i < samples; i+=1) {
      x = i * 2 / samples - 1;
      curve[i] = k * x * 60 * deg / (Math.PI + k * Math.abs(x));
    }

    return curve;
  }
});