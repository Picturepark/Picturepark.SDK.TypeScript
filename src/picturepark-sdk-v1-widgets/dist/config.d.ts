export interface Configuration {
    server: string;
    token: string;
    width: number;
    height: number;
    showNavigation?: boolean;
    showOverlay?: boolean;
    showLogo?: boolean;
    showFooter?: boolean;
    [name: string]: any;
}
export declare class PictureparkConfig {
    static get(element: HTMLElement): Configuration;
}
