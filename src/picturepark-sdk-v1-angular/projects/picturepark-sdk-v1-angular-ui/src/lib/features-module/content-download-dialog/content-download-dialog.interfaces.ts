import { ContentType, Output } from '@picturepark/sdk-v1-angular';

export interface IContentDownload {
    id: string;
    contentSchemaId: string;
    contentType: ContentType;
    outputs?: Output[];
}

export interface ContentDownloadDialogOptions {
    contents: IContentDownload[];
    mode: 'single' | 'multi';
}
