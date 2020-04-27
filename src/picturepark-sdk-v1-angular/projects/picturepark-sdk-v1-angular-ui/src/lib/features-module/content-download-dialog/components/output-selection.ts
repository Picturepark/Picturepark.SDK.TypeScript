// LIBRARIES
import { ContentType, OutputDataBase } from '@picturepark/sdk-v1-angular';
import { IContentDownload, IContentDownloadOutput } from '../content-download-dialog.interfaces';

// SERVICES
import {
  TranslationService,
  IOutputFormatTranslations,
} from '../../../shared-module/services/translations/translation.service';
import { flatMap } from '../../../utilities/helper';

export interface IOutputPerOutputFormatSelection {
  id: string;
  name: string;
  selected: boolean;
  hidden: boolean;
  values: [
    {
      content: IContentDownload;
      output: IContentDownloadOutput;
    }
  ];
}

export interface IOutputPerSchemaSelection {
  id: string;
  name: string;
  contents: IContentDownload[];
  outputs: {
    [outputFormatId: string]: IOutputPerOutputFormatSelection;
  };
}

export class OutputSelection {
  public hasThumbnails = false;

  private selection: { [fileSchemaId: string]: IOutputPerSchemaSelection };

  public get hasHiddenThumbnails(): boolean {
    return this.getThumbnailOutputs().some((i) => i.hidden);
  }

  constructor(
    outputs: IContentDownloadOutput[],
    contents: IContentDownload[],
    outputTranslations: IOutputFormatTranslations,
    translationService: TranslationService
  ) {
    this.selection = {};

    contents.forEach((content) => {
      const isBinary = content.contentType !== ContentType.Virtual;
      const schemaId = isBinary ? content.contentSchemaId : ContentType.Virtual.toString();
      const schemaItems = (this.selection[schemaId] = this.selection[schemaId] || {
        id: schemaId,
        contents: isBinary
          ? contents.filter((i) => i.contentSchemaId === schemaId)
          : contents.filter((i) => i.contentType === ContentType.Virtual),
        outputs: {},
        name: translationService.translate(`ContentDownloadDialog.${schemaId}`),
      });

      let contentOutputs: IContentDownloadOutput[];
      if (isBinary) {
        contentOutputs = outputs.filter((i) => i.contentId === content.id);
      } else {
        let output = outputs.find((i) => i.contentId === content.id);
        if (!output) {
          output = {
            outputFormatId: 'Original',
            contentId: content.id,
            detail: { fileSizeInBytes: 100 },
          } as IContentDownloadOutput;
        } else {
          // In case there is a virtual content defined in the outputs (share), set only the filesize
          output.detail = { fileSizeInBytes: 100 } as OutputDataBase;
        }
        contentOutputs = [output];
      }

      contentOutputs.forEach((output) => {
        const outputFormatItems = (schemaItems.outputs[output.outputFormatId] = schemaItems.outputs[
          output.outputFormatId
        ] || {
          id: output.outputFormatId,
          hidden: output.outputFormatId.indexOf('Thumbnail') === 0, // Hide thumbnails by default
          selected: false,
          values: [],
          name: outputTranslations[output.outputFormatId],
        });

        outputFormatItems.values.push({
          content: content,
          output: output,
        });
      });
    });

    this.hasThumbnails = this.getThumbnailOutputs().length > 0;
  }

  public getFileFormats(): IOutputPerSchemaSelection[] {
    return Object.keys(this.selection).map((fileFormat) => this.selection[fileFormat]);
  }

  public hasOutputs(fileFormat: IOutputPerSchemaSelection): boolean {
    return this.getOutputs(fileFormat).length > 0;
  }

  public getOutputs(fileFormat: IOutputPerSchemaSelection): IOutputPerOutputFormatSelection[] {
    return Object.keys(fileFormat.outputs)
      .map((outputFormat) => fileFormat.outputs[outputFormat])
      .sort((x, y) => (x.id === 'Original' ? -1 : x.name.localeCompare(y.name)));
  }

  public getSelectedOutputs(): IContentDownloadOutput[] {
    const selectedOutputs = this.getAllOutputs();
    const outputs = flatMap(
      selectedOutputs.filter((i) => i.selected),
      (i) => i.values
    ).map((i) => i.output);
    return outputs;
  }

  public toggleThumbnails(): void {
    const thumbnails = this.getThumbnailOutputs();
    const hasHidden = thumbnails.some((i) => i.hidden);
    thumbnails.forEach((i) => (i.hidden = !hasHidden));
  }

  private getAllOutputs(): IOutputPerOutputFormatSelection[] {
    return flatMap(
      this.getFileFormats().map((fileFormat) => this.getOutputs(fileFormat)),
      (i) => i
    );
  }

  private getThumbnailOutputs(): IOutputPerOutputFormatSelection[] {
    return this.getAllOutputs().filter((output) => output.id.indexOf('Thumbnail') === 0);
  }
}
