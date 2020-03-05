
import { Content, ContentDetail, Output, ShareContentDetail } from '@picturepark/sdk-v1-angular';
import { IContentDownload } from './content-download-dialog.interfaces';

export function fromContent(content: Content): IContentDownload {
    return {
        id: content.id,
        contentSchemaId: content.contentSchemaId,
        contentType: content.contentType
    } as IContentDownload;
}

export function fromContentDetail(content: ContentDetail | ShareContentDetail): IContentDownload {
    return {
        id: content.id,
        contentSchemaId:
        content.contentSchemaId,
        contentType: content.contentType,
        outputs: content.outputs as Output[]
    } as IContentDownload;
}

export function fromContentArray(content: Content[]): IContentDownload[] {
    return content.map(c => this.fromContent(c));
}

export function fromContentDetailArray(content: ContentDetail[] | ShareContentDetail[]): IContentDownload[] {
    return (content as Array<ContentDetail | ShareContentDetail>).map(c => this.fromContentDetail(c));
}
