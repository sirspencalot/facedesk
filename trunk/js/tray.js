/**
 * @author Michael Cereda - RedLightStudio.org
 * 2008-11-04
 *
 * SYSTEM TRAY EVENTS HANDLER
 */
MainWindow_OnClosing = function(event){
    event.preventDefault();
    window.nativeWindow.visible = false;
};
TrayIcon_Click = function(event){
	if (window.nativeWindow.visible) {
		window.nativeWindow.visible = false;
	} else {
		window.nativeWindow.visible = true;
	}
};
window.nativeWindow.addEventListener(air.Event.CLOSING, MainWindow_OnClosing);
var iconLoadComplete = function(event){
    air.NativeApplication.nativeApplication.icon.bitmaps = new runtime.Array(event.target.content.bitmapData);
};

air.NativeApplication.nativeApplication.autoExit = false;
var iconLoad = new air.Loader();
var iconMenu = new air.NativeMenu();
var exitCommand = iconMenu.addItem(new air.NativeMenuItem("Exit"));
exitCommand.addEventListener(air.Event.SELECT, function(event){
    air.NativeApplication.nativeApplication.icon.bitmaps = [];
    air.NativeApplication.nativeApplication.exit();
});
var traySupport = false;
if (air.NativeApplication.supportsSystemTrayIcon) {
    air.NativeApplication.nativeApplication.autoExit = false;
    iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE, iconLoadComplete);
    iconLoad.load(new air.URLRequest("icons/AIRApp_16.png"));
    air.NativeApplication.nativeApplication.icon.tooltip = "AIR application";
    air.NativeApplication.nativeApplication.icon.menu = iconMenu;
    traySupport = true;
}

if (air.NativeApplication.supportsDockIcon) {
    iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE, iconLoadComplete);
    iconLoad.load(new air.URLRequest("icons/AIRApp_128.png"));
    air.NativeApplication.nativeApplication.icon.menu = iconMenu;
    traySupport = true;
}
if (traySupport) {
    air.NativeApplication.nativeApplication.icon.addEventListener("click", TrayIcon_Click);
    
    var xmlString = air.NativeApplication.nativeApplication.applicationDescriptor;
    var appXml = new DOMParser();
    var xmlobject = appXml.parseFromString(xmlString, "text/xml");
    var root = xmlobject.getElementsByTagName('application')[0];
    var appId = root.getElementsByTagName("id")[0].firstChild.data;
    var appVersion = root.getElementsByTagName("version")[0].firstChild.data;
    var appName = root.getElementsByTagName("filename")[0].firstChild.data;
    
    tmpChar = appName.substring(0, 1).toUpperCase();
    postString = appName.substring(1, appName.length);
    appName = tmpChar + postString;
    
    air.NativeApplication.nativeApplication.icon.tooltip = appName + " " + appVersion;
}
