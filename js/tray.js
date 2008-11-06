/**
 * @author Michael Cereda - RedLightStudio.org
 * 2008-11-04
 *
 * SYSTEM TRAY EVENTS HANDLER
 */
var ApplicationExit = function(event){
    air.NativeApplication.nativeApplication.icon.bitmaps = [];
    air.NativeApplication.nativeApplication.exit();
}
var MainWindow_OnClosing = function(event){
    ApplicationExit();
}
var MainWindow_OnDisplayStateChange = function(event){
    if (event.afterDisplayState == 'minimized') {
        event.preventDefault();
        window.nativeWindow.visible = false;
    }else {
		if(event.afterDisplayState == 'maximized') {
		}
	}
    
};
var TrayIcon_Click = function(event){
    if (window.nativeWindow.visible) {
        window.nativeWindow.visible = false;
    } else {
        window.nativeWindow.visible = true;
        window.nativeWindow.orderToFront();
    }
};

var ApplicationToTray = function(){
    var iconLoad = new air.Loader();
    var iconMenu = new air.NativeMenu();
    air.NativeApplication.nativeApplication.autoExit = false;
    window.nativeWindow.addEventListener(air.NativeWindowDisplayStateEvent.DISPLAY_STATE_CHANGING, MainWindow_OnDisplayStateChange);
    window.nativeWindow.addEventListener(air.Event.CLOSING, MainWindow_OnClosing);
    var exitCommand = iconMenu.addItem(new air.NativeMenuItem("Exit"));
    // Create An Exit menu entry
    exitCommand.addEventListener(air.Event.SELECT, ApplicationExit);
    var iconLoadComplete = function(event){
        air.NativeApplication.nativeApplication.icon.bitmaps = new runtime.Array(event.target.content.bitmapData);
    };
    if (air.NativeApplication.supportsSystemTrayIcon) {
        // Loading Icon
        iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE, iconLoadComplete);
        iconLoad.load(new air.URLRequest("icons/AIRApp_16.png"));
        
        air.NativeApplication.nativeApplication.icon.menu = iconMenu;
        
        traySupport = true;
    } else {
        if (air.NativeApplication.supportsDockIcon) {
            // Loading Icon
            iconLoad.contentLoaderInfo.addEventListener(air.Event.COMPLETE, iconLoadComplete);
            iconLoad.load(new air.URLRequest("icons/AIRApp_128.png"));
            
            air.NativeApplication.nativeApplication.icon.menu = iconMenu;
            traySupport = true;
        }
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
}
ApplicationToTray();
