import { Injectable } from '@angular/core';
import {
    Content, Output, OutputSearchRequest, OutputService, OutputRenderingState,
    ContentDownloadLinkCreateRequest,
    ContentService,
    ContentType
} from '@picturepark/sdk-v1-angular';
import { IDownloadData } from '../components/content-download-dialog/download-data';
import { ContentDownloadDialogComponent } from '../components/content-download-dialog/content-download-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class DownloadFallbackService {
    public outputFormatFallback: {
        fileSchemaId: string;
        outputFormatId: string;
    }[];

    constructor(private outputService: OutputService, private dialog: MatDialog) {
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

    public download(contents: Content[]): void {
        const outputSubscription = this.outputService.search(new OutputSearchRequest({
            contentIds: contents.map(i => i.id),
            renderingStates: [OutputRenderingState.Completed],
            limit: 10000
        })).subscribe(outputs => {
            outputSubscription.unsubscribe();
            const items: IDownloadData = {};

            contents.forEach(content => {
                const isBinary = content.contentType !== ContentType.ContentItem;
                const schemaId = isBinary ? content.contentSchemaId : ContentType.ContentItem.toString();
                const schemaItems = items[schemaId] = items[schemaId] || {};
                const contentOutputs = outputs.results.filter(i => i.contentId === content.id);
                contentOutputs.forEach(output => {
                    const outputFormatItems = schemaItems[output.outputFormatId]
                          = schemaItems[output.outputFormatId] || { selected: false, values: [] };

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

            console.log(outputs.results
                .filter(i => i.detail)
                .map(i => i.detail!.fileSizeInBytes!)
                .reduce((total, value) => total + value )
            );
            console.log(items);

            const request = new ContentDownloadLinkCreateRequest({
                contents: contents.map(item => {
                    const contentOutputs = outputs.results.filter(i => i.contentId === item.id);
                    const output = this.getOutput(item, contentOutputs);
                    return { contentId: item.id, outputFormatId: output.outputFormatId };
                })
            });
            /*
            const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
                linkSubscription.unsubscribe();
                if (data.downloadUrl) {
                    window.location.replace(data.downloadUrl);
                }
            });*/
        });
    }
}
