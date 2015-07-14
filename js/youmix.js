$(document).ready(function() {
  var content = '<div class="ytp-button ytp-drop-down-menu-button" role="option" aria-labelledby="ytp-menu-speed" aria-checked="false" tabindex="2300"><div class="ytp-drop-down-menu-button-check"></div>0.75</div>';
  
  // Get the speed list for the HTML5 player
  var menuSpeed = $("#ytp-menu-speed");

  menuSpeed.next(".ytp-menu-cell").find(".ytp-drop-down-menu-content").append(content);


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