// LIBRARIES
import { TranslatedStringDictionary } from '@picturepark/sdk-v1-angular';

export class ItemNode {

    id: string;
    names?: TranslatedStringDictionary | string;
    fields?: ItemNode[] | null;
    schemaId: string;
    isSelectable: boolean;
    required: boolean;

    constructor(
        id: string,
        names: (TranslatedStringDictionary | string),
        fields: ItemNode[] | null,
        schemaId: string,
        required: boolean,
        isSelectable = true
    ) {
        this.id = id;
        this.names = names;
        this.fields = fields;
        this.schemaId = schemaId;
        this.isSelectable = isSelectable;
        this.required = required;
    }
}

export interface ItemNodeFlatNode {
    expandable: boolean;
    isSelectable: boolean;
    id: string;
    schemaId: string;
    required: boolean;
    level: number;
    names?: TranslatedStringDictionary | undefined;
  }
