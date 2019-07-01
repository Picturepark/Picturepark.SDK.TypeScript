import { Component, OnInit, Input } from '@angular/core';

// LIBRARY
import {
  ContentService, ContentResolveBehavior, ContentDownloadLinkCreateRequest, ContentType, OutputRenderingState
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../../shared-module/components/base.component';

// SERVICES
import { TranslationService } from '../../shared-module/services/translations/translation.service';

// INTERFACES
import { Formats } from './interfaces/formats.interface';

@Component({
  selector: 'pp-output-download-menu',
  templateUrl: './output-download-menu.component.html',
  styleUrls: ['./output-download-menu.component.scss']
})
export class OutputDownloadMenuComponent extends BaseComponent implements OnInit {

  @Input() public id: string;
  @Input() public formats: Formats[];
  @Input() public overlapTrigger = false;
  @Input() public yPosition = 'above'; // possible values  'above' | 'below'
  @Input() public xPosition = 'before'; // possible values 'before' | 'after'

  public outputFormats: Formats[];

  constructor(
    private contentService: ContentService,
    private translationService: TranslationService,
  ) {
    super();
  }

  ngOnInit() {
    if (!this.id) {
      throw new Error('Image is not defined !');
    }
  }

  public async getOutputFormats() {
    if (this.outputFormats) {
      return;
    }

    if (this.formats) {
      this.outputFormats = this.formats;
    } else {
      const content = await this.contentService.get(this.id, [ContentResolveBehavior.Outputs]).toPromise();

      if (content!.contentType === ContentType.ContentItem) {
        this.outputFormats = [{
          outputFormatId: 'Original',
          name: 'JSON'
        }];
        return;
      }

      const translations = await this.translationService.getOutputFormatTranslations();
      this.outputFormats = content!.outputs!.filter(i => i.renderingState === OutputRenderingState.Completed).map(i => {
        return {
          outputFormatId: i.outputFormatId,
          name: translations[i.outputFormatId]
        };
      });
    }
  }

  public download(outputFormatId: string) {
    const request = new ContentDownloadLinkCreateRequest({
      contents: [{ contentId: this.id, outputFormatId: outputFormatId }]
    });

    const createDownloadSubscription = this.contentService.createDownloadLink(request).subscribe(data => {
      if (data.downloadUrl) {
        window.location.replace(data.downloadUrl);
      }
    });

    this.subscription.add(createDownloadSubscription);
  }

  public trackByFormat(index, format: {outputFormatId: string, name: string}) {
    return format.outputFormatId;
  }
}
