$(document).ready(function() {
	var content = '<div class="ytp-button ytp-drop-down-menu-button" role="option" aria-labelledby="ytp-menu-speed" aria-checked="false" tabindex="2300"><div class="ytp-drop-down-menu-button-check"></div>0.75</div>';
	
	// Get the speed list for the HTML5 player
	var menuSpeed = $("#ytp-menu-speed");

	menuSpeed.next(".ytp-menu-cell").find(".ytp-drop-down-menu-content").append(content);
});


<div class="ytp-menu-row">
	<div class="ytp-menu-cell ytp-menu-title" id="ytp-menu-audio-mode">Mode</div>
	<div class="ytp-menu-cell">
		<div class="ytp-segmented-control" role="radiogroup" aria-label="Autoplay">
			<div class="ytp-button ytp-segmented-control-deselected" role="radio" aria-labelledby="ytp-menu-autoplay" aria-checked="false" tabindex="2050">Off</div>
			<div class="ytp-button ytp-segmented-control-other ytp-segmented-control-selected" role="radio" aria-labelledby="ytp-menu-autoplay" aria-checked="true" tabindex="2050">On</div>
		</div>
	</div>
</div>