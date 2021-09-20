import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { InfoFacade, CustomerInfo, PICTUREPARK_CONFIGURATION } from '@picturepark/sdk-v1-angular';
import { PictureparkCdnConfiguration } from 'projects/share-viewer/src/models/cdn-config';
import { translate } from '../../../utilities/translations';

export interface IOutputFormatTranslations {
  [outputFormatId: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private customerInfo: CustomerInfo;

  constructor(@Inject(LOCALE_ID) private locale: string, private infoFacade: InfoFacade,
  @Inject(PICTUREPARK_CONFIGURATION) private config: PictureparkCdnConfiguration) {}

  public async getOutputFormatTranslations(): Promise<IOutputFormatTranslations> {
    if (!this.customerInfo) {
      this.customerInfo = await this.infoFacade.getInfo(this.config.cdnUrl).toPromise();
    }

    const outputTranslations: { [outputFormatId: string]: string } = {};
    this.customerInfo.outputFormats.forEach((i) => {
      outputTranslations[i.id] = i.names.translate(this.locale);
    });

    return outputTranslations;
  }

  public translate(key: any) {
    return translate(key, this.locale);
  }
}
