import { ThumbnailSize } from '@picturepark/sdk-v2-angular';

export interface IBrowserView {
  name: string;
  type: 'thumbnailSmall' | 'thumbnailMedium' | 'thumbnailLarge' | 'list';
  icon: 'list' | 'check' | 'collections';
  thumbnailSize?: ThumbnailSize;
}
