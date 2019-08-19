import { SchemaDetail } from '@picturepark/sdk-v1-angular';

export class ReferencedSchemas {
  public schemaIds: string[];
  public schemaDetails: SchemaDetail[];

  public constructor(schemaIds: string[], schemaDetails: SchemaDetail[]) {
    this.schemaIds = schemaIds;
    this.schemaDetails = schemaDetails;
  }
}
