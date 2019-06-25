export interface PictureparkUIConfiguration {}
export declare const PICTUREPARK_UI_CONFIGURATION: string;
export function PictureparkUIConfigurationFactory() {
    return <PictureparkUIConfiguration>{
        content_browser: {
            downloadContent: true,
            shareContent: true
        },
        basket: {
            downloadContent: true,
            shareContent: true
        }
    }
}
  