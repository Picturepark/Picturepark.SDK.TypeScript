'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Opens a content picker window to select content items and create an embedded share.
 *
 * @param serverUrl The URL of the Picturepark server
 * @param settings Settings on how to open the content picker
 */
function showContentPicker(serverUrl, settings) {
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const w = (_a = settings === null || settings === void 0 ? void 0 : settings.width) !== null && _a !== void 0 ? _a : 1281;
        const h = (_b = settings === null || settings === void 0 ? void 0 : settings.height) !== null && _b !== void 0 ? _b : 800;
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        let url = serverUrl + (serverUrl.includes('?') ? '&' : '?') + 'postUrl=' + encodeURIComponent(window.location.origin);
        url += `&returnType=${encodeURIComponent((_c = settings === null || settings === void 0 ? void 0 : settings.returnType) !== null && _c !== void 0 ? _c : 'embed')}`;
        if (settings === null || settings === void 0 ? void 0 : settings.embedName)
            url += `&embedName=${encodeURIComponent(settings.embedName)}`;
        if (settings === null || settings === void 0 ? void 0 : settings.enableMediaEditor)
            url += `&enableMediaEditor=true`;
        if (settings === null || settings === void 0 ? void 0 : settings.mediaEditorUnlockPreset)
            url += `&mediaEditorUnlockPreset=true`;
        if (settings === null || settings === void 0 ? void 0 : settings.diableFocalPointEditor)
            url += `&diableFocalPointEditor=true`;
        var popup = window.open(url, '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',status=no,location=no,toolbar=no');
        var callbackCalled = false;
        const messageReceived = (event) => {
            if ((settings === null || settings === void 0 ? void 0 : settings.debug) && console) {
                console.log("CP Message received:");
                console.log(event);
            }
            if (serverUrl.startsWith(event.origin)) {
                window.removeEventListener("message", messageReceived);
                var result = event.data && event.data !== 'undefined' ? JSON.parse(event.data) : undefined;
                if (!callbackCalled) {
                    callbackCalled = true;
                    setTimeout(() => {
                        popup.close();
                        resolve(result);
                    });
                }
            }
        };
        const checkClosed = () => {
            if (popup.closed) {
                window.removeEventListener("message", messageReceived);
                if (!callbackCalled) {
                    callbackCalled = true;
                    resolve(undefined);
                }
            }
            else {
                setTimeout(() => checkClosed(), 100);
            }
        };
        window.addEventListener("message", messageReceived);
        checkClosed();
    });
}

exports.showContentPicker = showContentPicker;
