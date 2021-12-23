export interface IContentPickerSettings {
  width?: number;
  height?: number;
  debug?: boolean;
  returnType: 'embed' | 'content';
  embedName?: string;
  enableMediaEditor?: boolean;
}

/** 
 * Opens a content picker window to select content items and create an embedded share. 
 * 
 * @param serverUrl The URL of the Picturepark server
 * @param completed Callback which is called when the window has been closed (share is undefined if the user cancelled)
 */
export function showContentPicker(serverUrl: string, settings?: IContentPickerSettings) {
  return new Promise<IContentPickerResult>((resolve, reject) => {

    const w = settings?.width ?? 1281;
    const h = settings?.height ?? 800;

    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : (<any>screen).left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : (<any>screen).top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    let url = serverUrl + (serverUrl.includes('?') ? '&' : '?') + 'postUrl=' + encodeURIComponent(window.location.origin);
    url += `&returnType=${encodeURIComponent(settings?.returnType ?? 'embed')}`;
    if(settings?.embedName) url += `&embedName=${encodeURIComponent(settings.embedName)}`;
    if(settings?.enableMediaEditor) url += `&enableMediaEditor=true`;

    var popup: Window = window.open(url,
      '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',status=no,location=no,toolbar=no');

    var callbackCalled = false;
    const messageReceived = (event: any) => {
      if (settings?.debug && console) {
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
      } else {
        setTimeout(() => checkClosed(), 100)
      }
    }

    window.addEventListener("message", messageReceived);
    checkClosed();
  });
}

export interface IContentPickerResult {
  embed?: {
    shareId: string;
    items: { token: string, url: string }[];
  }
  contents?: [{id: string}]
}