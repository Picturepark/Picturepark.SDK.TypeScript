
    export interface IContentPickerSettings {
        width?: number;
        height?: number;
        debug?: boolean;
        returnType: 'embed' | 'content';
        embedName?: string;
    }
    /**
     * Opens a content picker window to select content items and create an embedded share.
     *
     * @param serverUrl The URL of the Picturepark server
     * @param completed Callback which is called when the window has been closed (share is undefined if the user cancelled)
     */
    export function showContentPicker(serverUrl: string, settings?: IContentPickerSettings): Promise<IContentPickerResult>;
    export interface IContentPickerResult {
        share?: {
            shareId: string;
            items: {
                token: string;
                url: string;
            }[];
        };
        contents?: [{
            id: string;
        }];
    }


