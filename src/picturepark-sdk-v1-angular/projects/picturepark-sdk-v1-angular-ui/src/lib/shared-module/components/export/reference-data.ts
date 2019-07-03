
// LIBRARIES
import { SchemaDetail } from '@picturepark/sdk-v1-angular';

export default class ReferencedData {

  public schemaIds: string[];
  public schemaDetails: SchemaDetail[];

  public constructor(schemaIds: string[], schemaDetails: SchemaDetail[]) {
    this.schemaIds = schemaIds;
    this.schemaDetails = schemaDetails;
  }

}
