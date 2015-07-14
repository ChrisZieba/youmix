$(document).ready(function() {
  var player = $("video.html5-main-video")[0];

  if (!player) {
    return;
  }


  var context = new webkitAudioContext();
  var gainNode = context.createGain();
  gainNode.gain.value = 4;


  filter = context.createBiquadFilter();
  filter.type = 3;
  filter.frequency.value = 95;
  filter.gain.value = 30;

  var source = context.createMediaElementSource(player);
  source.connect(gainNode);

  gainNode.connect(filter);
  // connect to output
  filter.connect(context.destination);
});