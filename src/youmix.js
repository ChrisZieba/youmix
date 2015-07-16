$(document).ready(function() {
  var player = $("video.html5-main-video")[0];

  if (!player) {
    return;
  }

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      samples = 44100,
      curve = new Float32Array(samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < samples; ++i ) {
      x = i * 2 / samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }


  var context = new AudioContext();
  var source = null;

  //set up the different audio nodes we will use for the app
  var analyser = context.createAnalyser();
  var distortion = context.createWaveShaper();
  var gainNode = context.createGain();
  var biquadFilter = context.createBiquadFilter();
  var convolver = context.createConvolver();
  var oscillator = context.createOscillator();
  var compressor = context.createDynamicsCompressor();



  $.get(chrome.extension.getURL("templates/body.html"), function(data) {
    $('#watch-header').after(data);
  });

  $('body').on('change', "#ym-presets", function() {
    var preset = $(this).val();
    console.log(preset);
    presets(preset);
  });

  function presets(preset) {
    

    switch (preset) {
      case 'normal':
        biquadFilter.disconnect();
        distortion.disconnect();
        analyser.disconnect();
        break;
      case 'hallway':
        setSource();
        source.connect(gainNode);
        gainNode.connect(biquadFilter);
        biquadFilter.connect(distortion);
        
        distortion.connect(analyser);
        

        //distortion.curve = makeDistortionCurve(560);
        //distortion.oversample = '4x';

        // connect to output
        analyser.connect(context.destination);


      // source.connect(analyser);
      // analyser.connect(distortion);
      // distortion.connect(biquadFilter);
      // biquadFilter.connect(convolver);
      // convolver.connect(gainNode);
      // gainNode.connect(context.destination);

        biquadFilter.type = "highpass";


        biquadFilter.frequency.value = 1000;
        biquadFilter.gain.value = 688;
        break;
    }

    function setSource() {
      if (!source) {
        source = context.createMediaElementSource(player);
      }
    }
  }
});