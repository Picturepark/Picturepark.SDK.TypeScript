
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
    export function showContentPicker(serverUrl: string, settings?: IContentPickerSettings): Promise<IShare>;
    export interface IShare {
        shareId: string;
        items: {
            token: string;
            url: string;
        }[];
    }


