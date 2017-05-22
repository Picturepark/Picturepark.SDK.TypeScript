// Picturepark Widgets SDK declarations
declare module "templates" {
    export class PictureparkTemplates {
        static getTemplate(templateId: string, width: number, height: number): string;
        private static getBasic(width, height);
        private static getCard(width, height);
    }
}
declare module "players" {
    export class PictureparkPlayers {
        static showDetail(cacheToken: string, contentId: string): void;
        static showItem(element: any, embedItem: any, selection: any): void;
        static loadScript(url: string, loaded: any): void;
        static loadCss(url: any): void;
        static loadImagePlayer(loaded: any): void;
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
