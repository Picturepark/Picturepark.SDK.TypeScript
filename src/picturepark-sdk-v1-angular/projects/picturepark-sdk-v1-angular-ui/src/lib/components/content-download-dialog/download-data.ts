import { Content, Output } from '@picturepark/sdk-v1-angular';

export interface IDownloadData {
     [fieldSchemaId: string]: {
         [outputFormatId: string]:
         [{
            content: Content,
            output: Output
        }]
    };
}
