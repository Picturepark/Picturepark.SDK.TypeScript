import { ThumbnailSize } from '@picturepark/sdk-v1-angular';

export interface IBrowserView {
  name: string;
  type: 'thumbnailSmall' | 'thumbnailMedium' | 'thumbnailLarge' | 'list';
  icon: 'list' | 'check' | 'collections';
  thumbnailSize?: ThumbnailSize;
}
