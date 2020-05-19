import { ShareContentDetail, ShareDetail } from '@picturepark/sdk-v1-angular';

export interface ContentDetailDialogOptions {
  id: string;
  shareContent: ShareContentDetail;
  shareDetail: ShareDetail;
  showMetadata: boolean;
  hasNext(): boolean;
  next(): ShareContentDetail | string;
  hasPrevious(): boolean;
  previous(): ShareContentDetail | string;
}
