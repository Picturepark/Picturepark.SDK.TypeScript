import { TranslatedStringDictionary } from '@picturepark/sdk-v1-angular';

import { LayerField } from './layer-field';

export class Layer {
  public names: TranslatedStringDictionary;
  public fields: LayerField[];
}
