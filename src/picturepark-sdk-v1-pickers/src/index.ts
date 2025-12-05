export interface IContentPickerSettings {
  width?: number;
  height?: number;
  debug?: boolean;
  returnType: 'embed' | 'content';
  embedName?: string;
  enableCollections?: boolean;
  enableMediaEditor?: boolean;
  mediaEditorUnlockPreset?: boolean;
}

/** 
 * Opens a content picker window to select content items and create an embedded share. 
 * 
 * @param serverUrl The URL of the Fotoware Alto server
 * @param settings Settings on how to open the content picker
 */
export function showContentPicker(serverUrl: string, settings?: IContentPickerSettings) {
  return new Promise<IContentPickerResult>((resolve, reject) => {
    const w = settings?.width ?? 1281;
    const h = settings?.height ?? 800;

    const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : (<any>screen).left;
    const dualScreenTop = window.screenTop != undefined ? window.screenTop : (<any>screen).top;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;

    let url = serverUrl + (serverUrl.includes('?') ? '&' : '?') + 'postUrl=' + encodeURIComponent(window.location.origin);
    url += `&returnType=${encodeURIComponent(settings?.returnType ?? 'embed')}`;
    if(settings?.embedName) url += `&embedName=${encodeURIComponent(settings.embedName)}`;
    if(settings?.enableCollections) url += `&enableCollections=true`;
    if(settings?.enableMediaEditor) url += `&enableMediaEditor=true`;
    if(settings?.mediaEditorUnlockPreset) url += `&mediaEditorUnlockPreset=true`;

    const popup = window.open(url,
      '_blank', 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left + ',status=no,location=no,toolbar=no');

    let callbackCalled = false;
    const messageReceived = (event: any) => {
      if (settings?.debug && console) {
        console.log("Fotoware Alto Message received:");
        console.log(event);
      }

      if (serverUrl.startsWith(event.origin)) {
        window.removeEventListener("message", messageReceived);
        const result = event.data && event.data !== 'undefined' ? JSON.parse(event.data) : undefined;
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
  /** Embed selected without media editor */
  embed?: any;
  /** Embed selected with media editor */
  editedEmbed: {
    embed: any;
    output: any;
  };
  /** Content selected without media editor */
  contents?: any[];
  /** Content selected with media editor */
  editedContent?: {
    conversionPreset: string;
    outputFormatId: string;
    content: any
  };
}