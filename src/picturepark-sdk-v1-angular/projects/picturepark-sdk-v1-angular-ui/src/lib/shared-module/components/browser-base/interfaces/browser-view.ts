export interface IBrowserView {
    name: string;
    type: 'thumbnailSmall' | 'thumbnailMedium' | 'thumbnailLarge' | 'list';
    icon: 'list' | 'check' | 'collections';
}
