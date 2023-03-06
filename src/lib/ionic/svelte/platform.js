import { config } from '@ionic/core/dist/collection/global/config';
import { readable } from 'svelte/store';
var _win;
var _doc;
export var getPlatforms = function (win) { return setupPlatforms(win); };
export var isPlatform = function (winOrPlatform, platform) {
    if (typeof winOrPlatform === 'string') {
        platform = winOrPlatform;
        winOrPlatform = undefined;
    }
    return getPlatforms(winOrPlatform).includes(platform);
};
export var setupPlatforms = function (win) {
    // to support SSR we need to wrap window and not initialise as default
    if (typeof window !== 'undefined') {
        win = window;
        _win = window;
    }
    // we need the document object later on as well - if possible
    if (typeof document !== 'undefined') {
        _doc = document;
    }
    if (typeof win === 'undefined') {
        return [];
    }
    win.Ionic = win.Ionic || {};
    var platforms = win.Ionic.platforms;
    if (platforms == null) {
        platforms = win.Ionic.platforms = detectPlatforms(win);
        platforms.forEach(function (p) { return win.document.documentElement.classList.add("plt-".concat(p)); });
    }
    return platforms;
};
var detectPlatforms = function (win) {
    var customPlatformMethods = config.get('platform');
    return Object.keys(PLATFORMS_MAP).filter(function (p) {
        var customMethod = customPlatformMethods === null || customPlatformMethods === void 0 ? void 0 : customPlatformMethods[p];
        return typeof customMethod === 'function' ? customMethod(win) : PLATFORMS_MAP[p](win);
    });
};
var isMobileWeb = function (win) { return isMobile(win) && !isHybrid(win); };
var isIpad = function (win) {
    // iOS 12 and below
    if (testUserAgent(win, /iPad/i)) {
        return true;
    }
    // iOS 13+
    if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
    }
    return false;
};
var isIphone = function (win) { return testUserAgent(win, /iPhone/i); };
var isIOS = function (win) { return testUserAgent(win, /iPhone|iPod/i) || isIpad(win); };
var isAndroid = function (win) { return testUserAgent(win, /android|sink/i); };
var isAndroidTablet = function (win) {
    return isAndroid(win) && !testUserAgent(win, /mobile/i);
};
var isPhablet = function (win) {
    var width = win.innerWidth;
    var height = win.innerHeight;
    var smallest = Math.min(width, height);
    var largest = Math.max(width, height);
    return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
};
var isTablet = function (win) {
    var width = win.innerWidth;
    var height = win.innerHeight;
    var smallest = Math.min(width, height);
    var largest = Math.max(width, height);
    return isIpad(win) || isAndroidTablet(win) || (smallest > 460 && smallest < 820 && largest > 780 && largest < 1400);
};
var isMobile = function (win) { return matchMedia(win, '(any-pointer:coarse)'); };
var isDesktop = function (win) { return !isMobile(win); };
var isHybrid = function (win) { return isCordova(win) || isCapacitorNative(win); };
var isCordova = function (win) { return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']); };
var isCapacitorNative = function (win) {
    var capacitor = win['Capacitor'];
    return !!(capacitor === null || capacitor === void 0 ? void 0 : capacitor.isNative);
};
var isElectron = function (win) { return testUserAgent(win, /electron/i); };
var isPWA = function (win) { var _a; return !!(((_a = win.matchMedia) === null || _a === void 0 ? void 0 : _a.call(win, '(display-mode: standalone)').matches) || win.navigator.standalone); };
export var testUserAgent = function (win, expr) { return expr.test(win.navigator.userAgent); };
var matchMedia = function (win, query) { var _a; return (_a = win.matchMedia) === null || _a === void 0 ? void 0 : _a.call(win, query).matches; };
var PLATFORMS_MAP = {
    ipad: isIpad,
    iphone: isIphone,
    ios: isIOS,
    android: isAndroid,
    phablet: isPhablet,
    tablet: isTablet,
    cordova: isCordova,
    capacitor: isCapacitorNative,
    electron: isElectron,
    pwa: isPWA,
    mobile: isMobile,
    mobileweb: isMobileWeb,
    desktop: isDesktop,
    hybrid: isHybrid
};
// SSR proof
export var networkStatus = readable(typeof window !== "undefined" ? (window.navigator.onLine ? 'on' : 'off') + 'line' : '', function (set) {
    var eventFunction = function () {
        if (typeof window !== "undefined")
            set((window.navigator.onLine ? 'on' : 'off') + 'line');
    };
    if (typeof window !== "undefined") {
        window.addEventListener('offline', eventFunction);
        window.addEventListener('online', eventFunction);
    }
    return function () {
        if (typeof window !== "undefined") {
            window.removeEventListener('offline', eventFunction);
            window.removeEventListener('online', eventFunction);
        }
    };
});
// taken from Angular's platform service
var readableEventFactory = function (args) {
    var defaultvalue = args.defaultvalue, event = args.event, eventAttr = args.eventAttr, listenerComponent = args.listenerComponent;
    return readable(defaultvalue, function (set) {
        var eventFunction = function (event) {
            if (eventAttr)
                set(event[eventAttr]);
            else
                set(event);
        };
        listenerComponent.addEventListener(event, eventFunction);
        return function () {
            listenerComponent.removeEventListener(event, eventFunction);
        };
    });
};
// SSR friendly
export var resize = readable('', function (set) { return function () { }; });
export var keyboardDidShow = readable('', function (set) { return function () { }; });
export var keyboardDidHide = readable('', function (set) { return function () { }; });
if (typeof window !== 'undefined') {
    resize = readableEventFactory({ defaultvalue: '', event: 'resize', eventAttr: 'timeStamp', listenerComponent: window });
    keyboardDidShow = readableEventFactory({ defaultvalue: '', event: 'ionKeyboardDidShow', eventAttr: undefined, listenerComponent: window });
    keyboardDidHide = readableEventFactory({ defaultvalue: '', event: 'ionKeyboardDidHide', eventAttr: undefined, listenerComponent: window });
}
export var resume = readable('', function (set) { return function () { }; });
export var pause = readable('', function (set) { return function () { }; });
export var backButton = readable('', function (set) { return function () { }; });
export var keydown = readable('', function (set) { return function () { }; });
if (typeof document !== 'undefined') {
    resume = readableEventFactory({ defaultvalue: '', event: 'resume', eventAttr: undefined, listenerComponent: document });
    pause = readableEventFactory({ defaultvalue: '', event: 'pause', eventAttr: undefined, listenerComponent: document });
    backButton = readableEventFactory({ defaultvalue: '', event: 'ionBackButton', eventAttr: undefined, listenerComponent: document });
    keydown = readableEventFactory({ defaultvalue: '', event: 'keydown', eventAttr: 'key', listenerComponent: document });
}
export var backButtonSubscribeWithPriority = function (handler, priority) {
    if (priority === void 0) { priority = 10; }
    if (typeof document !== "undefined")
        document.addEventListener('ionBackButton', function (ev) {
            ev.detail.register(priority, function () {
                handler();
                console.log('Handler was called!');
            });
        });
};
export var height = function () {
    if (_win)
        return _win.innerHeight;
    return 0;
};
export var width = function () {
    if (_win)
        return _win.innerWidth;
    return 0;
};
export var url = function () {
    if (_win)
        return _win.location.href;
    return '';
};
// make this in a readable - problem is that iOS does not support https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation 
export var isPortrait = function () {
    var _a;
    if (_win)
        return (_a = _win.matchMedia) === null || _a === void 0 ? void 0 : _a.call(_win, '(orientation: portrait)').matches;
    return false;
};
// make this in a derived
export var isLandscape = function () {
    return !isPortrait();
    ;
};
export var getQueryParam = function (key) {
    if (_win)
        return readQueryParam(_win.location.href, key);
    return null;
};
export var isRTL = function () {
    if (_doc)
        return _doc.dir === 'rtl';
};
/* redundant addition */
export var is = function (platformName) {
    if (_win)
        return isPlatform(_win, platformName);
    return false;
};
var readQueryParam = function (url, key) {
    key = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    var results = regex.exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
};
// todo - implement toggle for dark mode https://ionicframework.com/docs/theming/dark-mode
import { writable } from 'svelte/store';
export var prefersDark = writable(typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches : '');
if (typeof window !== "undefined")
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        prefersDark.set(e.matches ? true : false);
    });
export var toggleDarkTheme = function (shouldAdd) {
    if (_doc)
        document.body.classList.toggle('dark', shouldAdd);
};
