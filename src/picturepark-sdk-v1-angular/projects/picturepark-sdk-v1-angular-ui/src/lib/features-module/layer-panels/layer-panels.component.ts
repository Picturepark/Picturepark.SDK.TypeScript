import { Component, Input, OnInit } from '@angular/core';
import { ContentDetail, SchemaDetail, SchemaService } from '@picturepark/sdk-v1-angular';
import { take } from 'rxjs/operators';

import { Layer } from './models/layer';
import { LayerFieldService } from './services/layer-field.service';

@Component({
  selector: 'pp-layer-panels',
  templateUrl: './layer-panels.component.html',
  styleUrls: ['./layer-panels.component.scss']
})
export class LayerPanelsComponent implements OnInit {
  @Input()
  public schemas: SchemaDetail[];

  @Input()
  public content: ContentDetail;

  public layers: Layer[] = [];
  private allSchemas: SchemaDetail[];

  constructor(private schemaService: SchemaService,
    private layerFieldService: LayerFieldService) { }

  ngOnInit() {
    this.schemaService.getManyReferenced([this.content.contentSchemaId])
      .pipe(take(1))
      .subscribe(schemaDetails => {

        this.allSchemas = [...this.schemas, ...schemaDetails];

        const contentSchema = this.schemas.find(i => i.id === this.content.contentSchemaId);

        if (!contentSchema || !contentSchema.layerSchemaIds) {
          return;
        }


        contentSchema.layerSchemaIds.forEach(layerSchemaId => {
          if (this.content.layerSchemaIds.indexOf(layerSchemaId) === -1) {
            return;
          }

          // tslint:disable-next-line
          const schema: SchemaDetail | undefined = this.schemas.find(i => i.id === layerSchemaId);

          if (schema) {
            const schemaMetadata = this.content && this.content.metadata && this.content.metadata[this.toLowerCamel(schema.id)];
            if (!schemaMetadata) {
              return;
            }

            const layer: Layer = {
              names: schema.names,
              fields: []
            };

            // tslint:disable-next-line
            schema.fields && schema.fields.forEach(schemaField => {
              if (schemaMetadata[schemaField.id]) {
                const layerField = this.layerFieldService.generate(schemaField, schemaMetadata, this.allSchemas);

                if (layerField) {
                  layer.fields.push(layerField);
                }
              }
            });

            this.layers.push(layer);
          }
        });
      });
  }

  toLowerCamel(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
}
