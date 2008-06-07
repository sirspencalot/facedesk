/*extern air, $, $$ */
var facedesk = function () {
	var facebook = null;
	return {
		init : function () {
			window.moveTo((screen.width / 2) - (window.innerWidth / 2), 50);
			air.URLRequestDefaults.userAgent = air.URLRequestDefaults.userAgent + " Version\/3.0 Safari";
			facebook = $$("facebook-content");
			facebook.src = "http://www.facebook.com";
			nativeWindow.visible = true;
			nativeWindow.activate();
		}
	};
}();
DOMAssistant.DOMReady("facedesk.init()");