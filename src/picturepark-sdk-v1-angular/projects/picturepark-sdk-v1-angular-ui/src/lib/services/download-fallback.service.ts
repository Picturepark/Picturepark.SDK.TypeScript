import { Injectable } from '@angular/core';
import {
    Content, Output, OutputSearchRequest, OutputService, OutputRenderingState,
    ContentDownloadLinkCreateRequest,
    ContentService
} from '@picturepark/sdk-v1-angular';

@Injectable({
    providedIn: 'root'
})
export class DownloadFallbackService {
    public outputFormatFallback: {
        fileSchemaId: string;
        outputFormatId: string;
    }[];

    constructor(private outputService: OutputService, private contentService: ContentService) {
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

            const request = new ContentDownloadLinkCreateRequest({
                contents: contents.map(item => {
                    const contentOutputs = outputs.results.filter(i => i.contentId === item.id);
                    const output = this.getOutput(item, contentOutputs);
                    return { contentId: item.id, outputFormatId: output.outputFormatId };
                })
            });
            const linkSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
                linkSubscription.unsubscribe();
                if (data.downloadUrl) {
                    window.location.replace(data.downloadUrl);
                }
            });
        });
    }
}
