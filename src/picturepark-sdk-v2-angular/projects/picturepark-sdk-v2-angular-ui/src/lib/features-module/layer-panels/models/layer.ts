import { TranslatedStringDictionary } from '@picturepark/sdk-v2-angular';

import { LayerField } from './layer-field';

export class Layer {
  public id: string;
  public names?: TranslatedStringDictionary;
  public fields: LayerField[];
  public expanded: boolean;
}
