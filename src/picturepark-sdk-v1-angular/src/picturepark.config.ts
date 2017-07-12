import { OpaqueToken } from "@angular/core";

export const PICTUREPARK_CONFIGURATION = new OpaqueToken('PICTUREPARK_CONFIGURATION');

export interface PictureparkConfiguration {
    apiServer: string;
    stsServer: string;
    customerAlias: string;

    redirectUrl?: string;
    redirectRoute?: string;
}