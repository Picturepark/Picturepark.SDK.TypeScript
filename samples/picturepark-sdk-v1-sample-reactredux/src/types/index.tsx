import { ShareEmbedDetailViewItem } from '@picturepark/sdk-v1-fetch';

export interface StoreState {
  loading?: boolean;
  share?: ShareEmbedDetailViewItem | null;
}