/// <reference path="../src/pdfjs.d.ts" />
// Picturepark Widgets SDK declarations
declare module "templates" {
    export class PictureparkTemplates {
        static getTemplate(templateId: string, width: number, height: number, token: string, serverUrl: string): string;
        private static getBasic(width, height);
        private static getCard(width, height);
        private static getList(width, height, token, serverUrl);
    }
}
declare module "players" {
    export class PictureparkPlayers {
        static showDetail(token: string, contentId: string): void;
        static showItem(element: any, embedItem: any, selection: any, selections: any): void;
        static loadScript(url: string): Promise<void>;
        static loadCss(url: any): Promise<void>;
        static loadImagePlayer(): Promise<void>;
    }
}
declare module "pictureparkWidgets" {
    
    
    
    import { PictureparkPlayers } from "players";
    export let players: typeof PictureparkPlayers;
    /**
     * Processes a script tag.
     * @param scriptTag The script tag to process.
     */
    export function processScriptTag(scriptTag: HTMLElement): Promise<boolean>;
}
