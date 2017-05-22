/// <reference path="es6-promise.d.ts" />

import './promise.min.js';

/** 
 * Opens a content picker window to select content items and create an embedded share. 
 * 
 * @param serverUrl The URL of the Picturepark server
 * @param completed Callback which is called when the window has been closed (share is undefined if the user cancelled)
 */
export function showContentPicker(serverUrl: string) {
  return new Promise<IShare>((resolve, reject) => {
    var w = 1000;
    var h = 660;

    if (serverUrl.indexOf('http://localhost:4200') !== 0)
      serverUrl = serverUrl + '/elements';

    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : (<any>screen).left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : (<any>screen).top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    var popup: Window = window.open(serverUrl + '/content-picker?postUrl=' + encodeURIComponent(window.location.origin),
      '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',status=no,location=no,toolbar=no');

    var callbackCalled = false;
    let messageReceived = (event: any) => {
      if (event.origin == serverUrl) {
        window.removeEventListener("message", messageReceived);
        var share = event.data && event.data !== 'undefined' ? JSON.parse(event.data) : undefined;
        if (!callbackCalled) {
          callbackCalled = true;
          setTimeout(() => {
            popup.close();
            resolve(share);
          });
        }
      }
    };

    popup.onbeforeunload = () => {
      window.removeEventListener("message", messageReceived);
      if (!callbackCalled) {
        callbackCalled = true;
        resolve(undefined);
      }
    };

    window.addEventListener("message", messageReceived);
  });
}

export interface IShare {
  shareId: string;
  items: { token: string, url: string }[];
}