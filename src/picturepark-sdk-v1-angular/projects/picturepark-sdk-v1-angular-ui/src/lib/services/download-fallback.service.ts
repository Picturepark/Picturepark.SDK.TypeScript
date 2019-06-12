import { Injectable } from '@angular/core';
import {
    Content, Output, OutputSearchRequest, OutputService, OutputRenderingState, ContentType, fetchAll
} from '@picturepark/sdk-v1-angular';
import { IDownloadData } from '../components/content-download-dialog/download-data';
import { ContentDownloadDialogComponent } from '../components/content-download-dialog/content-download-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService } from './translation.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadFallbackService {
    public outputFormatFallback: {
        fileSchemaId: string;
        outputFormatId: string;
    }[];

    constructor(
        private outputService: OutputService,
        private translationService: TranslationService,
        private dialog: MatDialog) {
        this.outputFormatFallback = [
            { fileSchemaId: 'DocumentMetadata', outputFormatId: 'Pdf' },
            { fileSchemaId: 'AudioMetadata', outputFormatId: 'AudioSmall' },
            { fileSchemaId: 'VideoMetadata', outputFormatId: 'VideoLarge' }
        ];
    }

    public getOutput(content: Content, outputs: Output[]): Output {
        // Try to use Original
        let output = outputs.find(i => i.outputFormatId === 'Original');
        if (output) {
            return output;
        }

        // Fallback to configured output formats
        this.outputFormatFallback.filter(i => i.fileSchemaId === content.contentSchemaId).forEach(fallback => {
            output = outputs.find(i => i.outputFormatId === fallback.outputFormatId);
        });

        // If still no output, fallback to Preview
        if (!output) {
            output = outputs.find(i => i.outputFormatId === 'Preview');
        }

        return output!;
    }

    public async download(contents: Content[]): Promise<void> {
        const outputSubscription = fetchAll(req => this.outputService.search(req), new OutputSearchRequest({
            contentIds: contents.map(i => i.id),
            renderingStates: [OutputRenderingState.Completed],
            limit: 1000
        })).subscribe(outputs => {
            outputSubscription.unsubscribe();
            this.showDialog(contents, outputs.results);
        });
    }

    private async showDialog(contents: Content[], outputs: Output[]): Promise<void> {
        const translations = await this.translationService.getOutputFormatTranslations();
        const items: IDownloadData = {};

        contents.forEach(content => {
            const isBinary = content.contentType !== ContentType.ContentItem;
            const schemaId = isBinary ? content.contentSchemaId : ContentType.ContentItem.toString();
            const schemaItems = items[schemaId] = items[schemaId] ||
                {
                    contentCount: contents.filter(i => i.contentSchemaId === schemaId).length,
                    outputs: {},
                    name: this.translationService.translate(`ContentDownloadDialog.${schemaId}`)
                };

            const contentOutputs = outputs.filter(i => i.contentId === content.id);
            contentOutputs.forEach(output => {
                const outputFormatItems = schemaItems.outputs[output.outputFormatId] = schemaItems.outputs[output.outputFormatId] ||
                { selected: false, values: [], name: translations[output.outputFormatId] };

                outputFormatItems.values.push({
                    content: content,
                    output: output
                });
            });
        });

        this.dialog.open(ContentDownloadDialogComponent, {
            data: items,
            width: '50vw',
        });
    }
}
