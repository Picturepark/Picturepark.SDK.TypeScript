import { ContentDetail, ShareContentDetail, ShareDetail } from '@picturepark/sdk-v2-angular';
import { Observable } from 'rxjs';

export interface ContentDetailsDialogOptions {
  id: string;
  shareContent: ShareContentDetail;
  shareDetail: ShareDetail;
  showMetadata: boolean;
  showReferenced?: boolean;
  hasNext(): boolean;
  next(): Observable<ShareContentDetail | ContentDetail | string>;
  hasPrevious(): boolean;
  previous(): Observable<ShareContentDetail | ContentDetail | string>;
  isShareViewer?: boolean; 
}
