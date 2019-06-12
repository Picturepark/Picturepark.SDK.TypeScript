import { Content, Output } from '@picturepark/sdk-v1-angular';

export interface IDownloadData {
     [fieldSchemaId: string]: {
        name: string;
        contentCount: number;
        outputs: {
            [outputFormatId: string]:
            {
                name: string;
                selected: boolean;
                hidden: boolean;
                values: [{
                    content: Content,
                    output: Output
                }]
            }
        }
    };
}
