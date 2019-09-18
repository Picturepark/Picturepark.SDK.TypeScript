import { Content } from '@picturepark/sdk-v1-angular';

export interface ContentDownloadDialogOptions {
    contents: Content[];
    mode: 'single' | 'multi';
}
