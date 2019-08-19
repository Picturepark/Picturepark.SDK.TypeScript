import { Component, Input, OnInit } from '@angular/core';
import {
  ContentDetail,
  FieldMultiFieldset,
  FieldMultiRelation,
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleRelation,
  FieldSingleTagbox,
  SchemaDetail,
} from '@picturepark/sdk-v1-angular';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Layer } from './models/layer';
import { ReferencedSchemas } from './models/referenced-schemas';
import { LayerFieldService } from './services/layer-field.service';
import { ReferencedSchemaService } from './services/referenced-schema.service';

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

  constructor(private referencedSchemaService: ReferencedSchemaService,
    private layerFieldService: LayerFieldService) { }

  ngOnInit() {
    const referencedTypes = [
      FieldSingleFieldset,
      FieldMultiFieldset,
      FieldSingleRelation,
      FieldMultiRelation,
      FieldSingleTagbox,
      FieldMultiTagbox];

    const schemaIds = new Set<string>();

    this.schemas.forEach(s => {
      if (s && s.fields) {
        s.fields.filter(f => referencedTypes.some(t => t === f.constructor)).
          forEach((tg: (FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox | FieldMultiFieldset)) =>
            schemaIds.add(tg.schemaId));
      }
    });

    const referencedSchemas = schemaIds.size ?
      this.referencedSchemaService.getReferencedSchemas(of(new ReferencedSchemas([...schemaIds], [])), referencedTypes)
      : of(new ReferencedSchemas([], []));

    referencedSchemas.pipe(
      take(1),
      map(r => r.schemaDetails))
      .subscribe(schemaDetails => {

        this.allSchemas = [...this.schemas, ...schemaDetails];

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
