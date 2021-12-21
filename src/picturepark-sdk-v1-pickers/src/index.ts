export interface IContentPickerSettings {
  width?: number;
  height?: number;
  debug?: boolean;
  embedName?: string;
}

/** 
 * Opens a content picker window to select content items and create an embedded share. 
 * 
 * @param serverUrl The URL of the Picturepark server
 * @param completed Callback which is called when the window has been closed (share is undefined if the user cancelled)
 */
export function showContentPicker(serverUrl: string, settings?: IContentPickerSettings) {
  return new Promise<IShare>((resolve, reject) => {

    const w = settings?.width ?? 1281;
    const h = settings?.height ?? 800;

    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : (<any>screen).left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : (<any>screen).top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    let url = serverUrl + (serverUrl.includes('?') ? '&' : '?') + 'postUrl=' + encodeURIComponent(window.location.origin);
    if(settings?.embedName) url += `&embedName=${encodeURIComponent(settings.embedName)}`;

    var popup: Window = window.open(url,
      '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',status=no,location=no,toolbar=no');

    var callbackCalled = false;
    let messageReceived = (event: any) => {
      if (settings?.debug && console) {
        console.log("CP Message received:");
        console.log(event);
      }

      if (serverUrl.startsWith(event.origin)) {
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

      if (popup.closed) {
        window.removeEventListener("message", messageReceived);
        if (!callbackCalled) {
          callbackCalled = true;
          resolve(undefined);
        }
      }  
    };

    window.addEventListener("message", messageReceived);
  });
}

export interface IShare {
  shareId: string;
  items: { token: string, url: string }[];
}