$(document).ready(function() {
	var content = '<div class="ytp-button ytp-drop-down-menu-button" role="option" aria-labelledby="ytp-menu-speed" aria-checked="false" tabindex="2300"><div class="ytp-drop-down-menu-button-check"></div>0.75</div>';
	
	// Get the speed list for the HTML5 player
	var menuSpeed = $("#ytp-menu-speed");

	menuSpeed.next(".ytp-menu-cell").find(".ytp-drop-down-menu-content").append(content);
});