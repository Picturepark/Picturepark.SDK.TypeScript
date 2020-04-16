import { ContentType, OutputDataBase } from '@picturepark/sdk-v1-angular';

export interface IContentDownloadOutput {
  contentId: string;
  outputFormatId: string;
  detail?: OutputDataBase | undefined;
  dynamicRendering: boolean;
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
}
