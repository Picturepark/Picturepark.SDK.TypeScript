import * as picturepark from '../../picturepark-sdk-v1-fetch/dist/index';
export declare class PictureparkPlayers {
    static loading: boolean;
    static scriptsPath: any;
    static showPrevious(token: string, elementId: string): void;
    static showNext(token: string, elementId: string): void;
    private static showGalleryItem;
    private static getGallery;
    static showDetail(token: string, shareItemId: string, widgetId: string): void;
    static showDetailById(shareItemId: string, shareItems: IShareItem[], widgetId?: string): void;
    private static loadedPlayers;
    static disposeVideoPlayer(player: any): void;
    static renderVideoPlayerIfNeeded(item: {
        previewUrl: string;
        originalUrl: string;
    }, element: any, width: any, height: any): any;
    static renderVideoPlayer(element: any, item: any, width: any, height: any): Promise<any>;
    static loadVideoPlayerLibraries(): Promise<any>;
    static showPdfJsItem(item: any): void;
    static showPhotoSwipeItem(shareItem: IShareItem, shareItems?: IShareItem[], galleryElementId?: string): Promise<void>;
    static loadPhotoSwipe(): Promise<{
        element: Element;
        photoSwipe: any;
        photoSwipeDefault: any;
    }>;
    static getPhotoSwipeElement(): Element;
    static loadScript(url: string, globalName: string): Promise<any>;
    static loadCss(url: any): Promise<void>;
}
interface IShareItem {
    id: string;
    isImage: boolean;
    isPdf: boolean;
    isMovie: boolean;
    isAudio: boolean;
    isBinary: boolean;
    displayValues: any;
    previewUrl: string;
    originalUrl: string;
    videoUrl: string;
    audioUrl: string;
    pdfUrl: string;
    detail: {
        width: number;
        height: number;
    };
    outputs: picturepark.ShareOutputBase[];
}
export {};
