declare module "pictureparkWidgets" {
    /**
     * Processes a script tag.
     * @param scriptTag The script tag to process.
     */
    export function processScriptTag(scriptTag: HTMLElement): Promise<boolean>;
}
