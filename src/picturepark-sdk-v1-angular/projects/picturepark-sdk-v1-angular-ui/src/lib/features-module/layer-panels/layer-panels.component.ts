import { Component, Input, OnInit } from '@angular/core';
import { ContentDetail, SchemaDetail, SchemaService } from '@picturepark/sdk-v1-angular';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    combineLatest([this.schemaService.get(this.content.contentSchemaId), this.schemaService.getManyReferenced([this.content.contentSchemaId])])
      .pipe(map(([schema, schemaDetails]) => [schema, ...schemaDetails]),
        take(1))
      .subscribe(schemaDetails => {

        this.allSchemas = schemaDetails;

        const contentSchema = this.schemas.find(i => i.id === this.content.contentSchemaId);

        // tslint:disable-next-line
        contentSchema && contentSchema.layerSchemaIds && contentSchema.layerSchemaIds.forEach(layerSchemaId => {
          if (this.content.layerSchemaIds.indexOf(layerSchemaId) === -1) {
            return;
          }

          // tslint:disable-next-line
          const schema: SchemaDetail | undefined = this.schemas.find(i => i.id === layerSchemaId);

          if (schema) {
            const schemaMetadata = this.content && this.content.metadata && this.content.metadata[this.toLowerCamel(schema.id)];

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
