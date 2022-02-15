import { TranslatedStringDictionary } from '@picturepark/sdk-v2-angular';

import { LayerField } from './layer-field';

export class Layer {
  id: string;
  names?: TranslatedStringDictionary;
  fields: LayerField[];
  expanded: boolean;
}
