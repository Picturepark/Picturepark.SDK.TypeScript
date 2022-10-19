export interface IContentPickerSettings {
    width?: number;
    height?: number;
    debug?: boolean;
    returnType: 'embed' | 'content';
    embedName?: string;
    enableMediaEditor?: boolean;
    mediaEditorUnlockPreset?: boolean;
    diableFocalPointEditor?: boolean;
}
/**
 * Opens a content picker window to select content items and create an embedded share.
 *
 * @param serverUrl The URL of the Picturepark server
 * @param settings Settings on how to open the content picker
 */
export declare function showContentPicker(serverUrl: string, settings?: IContentPickerSettings): Promise<IContentPickerResult>;
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
        content: any;
    };
}
