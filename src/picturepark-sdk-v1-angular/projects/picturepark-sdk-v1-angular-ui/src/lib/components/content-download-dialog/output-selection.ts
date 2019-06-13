import { Content, Output, ContentType } from '@picturepark/sdk-v1-angular';
import { IOutputFormatTranslations } from '@picturepark/sdk-v1-angular-ui/lib/services/translation.service';
import { TranslationService } from '../../services/translation.service';

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
    name: string;
    contentCount: number;
    outputs: {
        [outputFormatId: string]: IOutputPerOutputFormatSelection
    };
}

export class OutputSelection {
    private selection: { [fileSchemaId: string]: IOutputPerSchemaSelection };

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
                        contentCount: isBinary ? contents.filter(i => i.contentSchemaId === schemaId).length :
                                      contents.filter(i => i.contentType === ContentType.ContentItem).length,
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
                        values: [],
                        name: outputTranslations[output.outputFormatId]
                    };

                    outputFormatItems.values.push({
                        content: content,
                        output: output
                    });
                });
            });
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
        const selectedOutputs = this.getFileFormats().map(fileFormat => this.getOutputs(fileFormat));
        const outputs = this.flatMap(this.flatMap(selectedOutputs, i => i).filter(i => i.selected), i => i.values).map(i => i.output);
        return outputs;
    }

    private flatMap<T, U>(array: T[], mapFunc: (x: T) => U[]): U[] {
        return array.reduce((cumulus: U[], next: T) => [...mapFunc(next), ...cumulus], <U[]> []);
    }
}
