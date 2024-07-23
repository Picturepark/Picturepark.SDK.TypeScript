import './libraries/liquid.min.js';
export { PictureparkPlayers as players } from './players';
/**
 * Processes a script tag.
 * @param scriptTag The script tag to process.
 */
export declare function processScriptTag(scriptTag: HTMLElement): Promise<boolean>;
