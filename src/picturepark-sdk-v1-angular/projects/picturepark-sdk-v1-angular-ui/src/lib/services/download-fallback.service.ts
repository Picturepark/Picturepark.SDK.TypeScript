import { Injectable } from '@angular/core';
import {
    Content, Output, OutputSearchRequest, OutputService, OutputRenderingState, fetchAll
} from '@picturepark/sdk-v1-angular';
import { OutputSelection } from '../components/content-download-dialog/output-selection';
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
            { fileSchemaId: 'ImageMetadata', outputFormatId: 'Preview' },
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
        const selection = new OutputSelection(outputs, contents, translations, this.translationService);

        // Preselect logic with fallback
        selection.getFileFormats().forEach(fileFormat => {
            const fileFormatOutputs = selection.getOutputs(fileFormat);
            const fileFormatContents = selection.flatMap(fileFormatOutputs, i => i.values);
            if (fileFormat.contents.length === 0) {
                return;
            }

            const fallbackOutputs = fileFormat.contents
                .map(content => this.getOutput(
                    content,
                    fileFormatContents.filter(j => j.content.id === content.id).map(i => i.output))
                )
                .filter(i => i);

            if (fallbackOutputs.length === 0) {
                return;
            }

            const grouped = this.groupBy(fallbackOutputs, i => i.outputFormatId);
            fileFormatOutputs.forEach(output => {
                const fallback = grouped.get(output.id);
                if (!fallback) {
                    return;
                }
                if (fallback && fallback.length === fileFormat.contents.length) {
                    output.selected = true;
                }
            });
        });

        this.dialog.open(ContentDownloadDialogComponent, {
            data: selection,
            width: '50vw',
            autoFocus: false
        });
    }

    groupBy<T, K>(list: T[], getKey: (item: T) => K): Map<K, T[]> {
        const map = new Map<K, T[]>();
        list.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
}
