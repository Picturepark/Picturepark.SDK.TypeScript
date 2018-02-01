import { ContentDetail } from '@picturepark/sdk-v1-fetch';

export interface StoreState {
  server?: string;
  apiServer?: string; 
  accessToken?: string;
  customerAlias?: string;
  token?: string;
  loading?: boolean;
  data?: string;
}