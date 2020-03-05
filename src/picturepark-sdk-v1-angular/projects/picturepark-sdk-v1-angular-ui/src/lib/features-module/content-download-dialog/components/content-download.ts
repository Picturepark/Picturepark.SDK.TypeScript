import { Injectable } from '@angular/core';
import { Content, ContentDetail, ContentType, Output, ShareContentDetail } from '@picturepark/sdk-v1-angular';

export class ContentDownload {
    id: string;
    contentSchemaId: string;
    contentType: ContentType;
    outputs?: Output[];

    constructor(id: string, contentSchemaId: string, contentType: ContentType, outputs?: Output[]) {
        this.id = id;
        this.contentSchemaId = contentSchemaId;
        this.contentType = contentType;
        this.outputs = outputs;
    }
}

@Injectable({
    providedIn: 'root',
})
export class ContentDownloadService {

    public fromContent(content: Content): ContentDownload {
        return new ContentDownload(content.id, content.contentSchemaId, content.contentType);
    }

    public fromContentDetail(content: ContentDetail | ShareContentDetail): ContentDownload {
        return new ContentDownload(content.id, content.contentSchemaId, content.contentType, content.outputs as Output[]);
    }

    public fromContentArray(content: Content[]): ContentDownload[] {
        return content.map(c => this.fromContent(c));
    }

    public fromContentDetailArray(content: ContentDetail[] | ShareContentDetail[]): ContentDownload[] {
        return (content as Array<ContentDetail | ShareContentDetail>).map(c => this.fromContentDetail(c));
    }
}
