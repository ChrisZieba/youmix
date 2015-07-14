$(document).ready(function() {
  var player = $("video.html5-main-video")[0];

  if (!player) {
    return;
  }


  var context = new AudioContext();

  //set up the different audio nodes we will use for the app
  var analyser = context.createAnalyser();
  var distortion = context.createWaveShaper();
  var gainNode = context.createGain();
  var biquadFilter = context.createBiquadFilter();
  var convolver = context.createConvolver();
  var oscillator = context.createOscillator();



  var source = context.createMediaElementSource(player);
  source.connect(gainNode);
  gainNode.connect(biquadFilter);
  //distortion.connect(convolver);
  //convolver.connect(gainNode);
  //analyser.connect(distortion);
  


  // connect to output
  biquadFilter.connect(context.destination);


// source.connect(analyser);
// analyser.connect(distortion);
// distortion.connect(biquadFilter);
// biquadFilter.connect(convolver);
// convolver.connect(gainNode);
// gainNode.connect(context.destination);

  biquadFilter.type = "highpass";
  biquadFilter.frequency.value = 1000;
  biquadFilter.gain.value = 666;


  $.get(chrome.extension.getURL("templates/body.html"), function(data) {
    $('#watch-header').after(data);
  });

});