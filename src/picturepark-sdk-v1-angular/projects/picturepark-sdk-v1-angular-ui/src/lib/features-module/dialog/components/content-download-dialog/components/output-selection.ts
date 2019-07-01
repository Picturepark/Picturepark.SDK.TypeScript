// LIBRARIES
import { Content, Output, ContentType } from '@picturepark/sdk-v1-angular';

// SERVICES
import { TranslationService, IOutputFormatTranslations } from '../../../../../shared-module/services/translations/translation.service';

export interface IOutputPerOutputFormatSelection {
    id: string;
    name: string;
    selected: boolean;
    hidden: boolean;
    values: [{
        content: Content,
        output: Output
    }];
}

export interface IOutputPerSchemaSelection {
    id: string;
    name: string;
    contents: Content[];
    outputs: {
        [outputFormatId: string]: IOutputPerOutputFormatSelection
    };
}

export class OutputSelection {
    public hasThumbnails = false;

    private selection: { [fileSchemaId: string]: IOutputPerSchemaSelection };

    public get hasHiddenThumbnails(): boolean {
        return this.getThumbnailOutputs().some(i => i.hidden);
    }

    constructor(
        outputs: Output[],
        contents: Content[],
        outputTranslations: IOutputFormatTranslations,
        translationService: TranslationService) {
            this.selection = {};

            contents.forEach(content => {
                const isBinary = content.contentType !== ContentType.ContentItem;
                const schemaId = isBinary ? content.contentSchemaId : ContentType.ContentItem.toString();
                const schemaItems = this.selection[schemaId] = this.selection[schemaId] ||
                    {
                        id: schemaId,
                        contents: isBinary ? contents.filter(i => i.contentSchemaId === schemaId) :
                                      contents.filter(i => i.contentType === ContentType.ContentItem),
                        outputs: {},
                        name: translationService.translate(`ContentDownloadDialog.${schemaId}`)
                    };

                const contentOutputs = isBinary ? outputs.filter(i => i.contentId === content.id) :
                      [{ outputFormatId: 'Original', contentId: content.id, detail: { fileSizeInBytes: 100 } } as Output];

                contentOutputs.forEach(output => {
                    const outputFormatItems = schemaItems.outputs[output.outputFormatId] = schemaItems.outputs[output.outputFormatId] ||
                    {
                        id: output.outputFormatId,
                        hidden: output.outputFormatId.indexOf('Thumbnail') === 0, // Hide thumbnails by default
                        selected: false,
                        values: [],
                        name: outputTranslations[output.outputFormatId]
                    };

                    outputFormatItems.values.push({
                        content: content,
                        output: output
                    });
                });
            });

            this.hasThumbnails = this.getThumbnailOutputs().length > 0;
    }

    public getFileFormats(): IOutputPerSchemaSelection[] {
        return Object.keys(this.selection).map(fileFormat => this.selection[fileFormat]);
    }

    public getOutputs(fileFormat: IOutputPerSchemaSelection): IOutputPerOutputFormatSelection[] {
        return Object.keys(fileFormat.outputs)
               .map(outputFormat => fileFormat.outputs[outputFormat])
               .sort((x, y) => x.id === 'Original' ? - 1 : x.name.localeCompare(y.name) );
    }

    public getSelectedOutputs(): Output[] {
        const selectedOutputs = this.getAllOutputs();
        const outputs = this.flatMap(selectedOutputs.filter(i => i.selected), i => i.values).map(i => i.output);
        return outputs;
    }

    public toggleThumbnails(): void {
        const thumbnails = this.getThumbnailOutputs();
        const hasHidden = thumbnails.some(i => i.hidden);
        thumbnails.forEach(i => i.hidden = !hasHidden);
    }

    public flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
        return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]> []);
    }

    private getAllOutputs(): IOutputPerOutputFormatSelection[] {
        return this.flatMap(this.getFileFormats().map(fileFormat => this.getOutputs(fileFormat)), i => i);
    }

    private getThumbnailOutputs(): IOutputPerOutputFormatSelection[] {
        return this.getAllOutputs().filter(output => output.id.indexOf('Thumbnail') === 0);
    }
}
