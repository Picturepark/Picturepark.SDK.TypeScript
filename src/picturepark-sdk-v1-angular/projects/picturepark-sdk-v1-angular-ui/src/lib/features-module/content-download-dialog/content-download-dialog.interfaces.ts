import { ContentDownload } from './components/content-download';


export interface ContentDownloadDialogOptions {
    contents: ContentDownload[];
    mode: 'single' | 'multi';
}
