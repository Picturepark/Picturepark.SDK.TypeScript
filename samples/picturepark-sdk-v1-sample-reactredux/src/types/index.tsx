import { ContentDetail } from '@picturepark/sdk-v1-fetch';

export interface StoreState {
  server?: string; 
  accessToken?: string;
  token?: string;
  loading?: boolean;
  data?: string;
}