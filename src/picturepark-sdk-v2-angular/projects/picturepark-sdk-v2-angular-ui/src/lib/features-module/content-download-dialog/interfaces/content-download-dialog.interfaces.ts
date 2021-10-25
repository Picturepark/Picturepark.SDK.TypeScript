import { ContentType, OutputDataBase, OutputRenderingState } from '@picturepark/sdk-v2-angular';

export interface IContentDownloadOutput {
  contentId: string;
  outputFormatId: string;
  detail?: OutputDataBase | undefined;
  dynamicRendering: boolean;
  renderingState?: OutputRenderingState;
  fileSize?: number;
}

export interface IContentDownload {
  id: string;
  contentSchemaId: string;
  contentType: ContentType;
  outputs?: IContentDownloadOutput[];
}

export interface ContentDownloadDialogOptions {
  contents: IContentDownload[];
  mode: 'single' | 'multi';
  shareToken?: string;
  isShareViewer?: boolean;
}
