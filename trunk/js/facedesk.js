/*extern air, $, $$ */
var facedesk = function () {
	var facebook = null;
	var facebookFrame = null;
	var fbNavigator = null;
	return {
		init : function () {
			facebook = window.frames["facebook-content-frame"];
			facebookFrame = $$("facebook-content");
			if (facebook && facebookFrame) {
				facebookFrame.onload = this.initFacebook;
			}
		},
		
		initFacebook : function () {
			nativeWindow.visible = true;
		}
	};
}();
DOMAssistant.DOMReady("facedesk.init()");