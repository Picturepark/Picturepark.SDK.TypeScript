import { ShareEmbedDetailViewItem } from '@picturepark/sdk-v1-fetch';

export interface StoreState {
  server?: string; 
  token?: string;
  loading?: boolean;
  share?: ShareEmbedDetailViewItem | null;
}