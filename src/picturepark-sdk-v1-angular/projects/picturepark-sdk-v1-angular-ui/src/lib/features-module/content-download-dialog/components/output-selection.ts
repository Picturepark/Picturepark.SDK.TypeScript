// LIBRARIES
import { ContentType, DownloadDialogBehavior, OutputDataBase, OutputFormatInfo } from '@picturepark/sdk-v1-angular';
import { IContentDownload, IContentDownloadOutput } from '../interfaces/content-download-dialog.interfaces';

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

  public get hasHiddenOutputFormats(): boolean {
    return this.getShowMoreOutputs().some((i) => i.hidden);
  }

  constructor(
    outputs: IContentDownloadOutput[],
    contents: IContentDownload[],
    outputTranslations: IOutputFormatTranslations,
    translationService: TranslationService,
    private outputFormatInfos: OutputFormatInfo[]
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
        const outputFormat = outputFormatInfos.find((i) => i.id === output.outputFormatId);
        if (outputFormat?.behaviors?.downloadDialogBehavior === DownloadDialogBehavior.Hide) {
          return;
        }

        const outputFormatItems = (schemaItems.outputs[output.outputFormatId] = schemaItems.outputs[
          output.outputFormatId
        ] || {
          id: output.outputFormatId,
          hidden: outputFormat?.behaviors?.downloadDialogBehavior === DownloadDialogBehavior.ShowMoreFormats,
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

    this.hasThumbnails = this.getShowMoreOutputs().length > 0;
  }

  public getFileFormats(): IOutputPerSchemaSelection[] {
    return Object.keys(this.selection).map((fileFormat) => this.selection[fileFormat]);
  }

  public hasOutputs(fileFormat: IOutputPerSchemaSelection): boolean {
    return this.getOutputs(fileFormat).length > 0;
  }

  public getOutputs(fileFormat: IOutputPerSchemaSelection): IOutputPerOutputFormatSelection[] {
    const outputs = Object.keys(fileFormat.outputs).map((outputFormat) => fileFormat.outputs[outputFormat]);
    return [
      ...outputs.filter((o) => o.id === 'Original'),
      ...outputs.filter((o) => o.id !== 'Original').sort((x, y) => x.name.localeCompare(y.name)),
    ];
  }

  public getSelectedOutputs(): IContentDownloadOutput[] {
    const selectedOutputs = this.getAllOutputs();
    const outputs = flatMap(
      selectedOutputs.filter((i) => i.selected),
      (i) => i.values
    ).map((i) => i.output);
    return outputs;
  }

  public toggleShowMore(): void {
    const thumbnails = this.getShowMoreOutputs();
    const hasHidden = thumbnails.some((i) => i.hidden);
    thumbnails.forEach((i) => (i.hidden = !hasHidden));
  }

  private getAllOutputs(): IOutputPerOutputFormatSelection[] {
    return flatMap(
      this.getFileFormats().map((fileFormat) => this.getOutputs(fileFormat)),
      (i) => i
    );
  }

  private getShowMoreOutputs(): IOutputPerOutputFormatSelection[] {
    return this.getAllOutputs().filter(
      (output) =>
        this.outputFormatInfos.find((i) => i.id === output.id)?.behaviors?.downloadDialogBehavior ===
        DownloadDialogBehavior.ShowMoreFormats
    );
  }
}
