import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContentDetail, SchemaDetail, SchemaService } from '@picturepark/sdk-v1-angular';
import { take } from 'rxjs/operators';

import { Layer } from './models/layer';
import { LayerFieldService } from './services/layer-field.service';
import { RelationFieldInfo } from './models/relation-field-info';

@Component({
  selector: 'pp-layer-panels',
  templateUrl: './layer-panels.component.html',
  styleUrls: ['./layer-panels.component.scss'],
})
export class LayerPanelsComponent implements OnInit {
  @Input()
  public schemas: SchemaDetail[];

  @Input()
  public content: ContentDetail;

  @Input()
  public showContentSchema = false;

  @Input()
  public excludedLayerSchemaIds: string[] | undefined = [];

  @Output()
  public relationClick = new EventEmitter<RelationFieldInfo>();

  public layers: Layer[] = [];
  public expandedSchemas: Set<string> = new Set<string>();

  private allSchemas: SchemaDetail[];

  localStorageKey = 'SchemaExpansionState';

  constructor(private schemaService: SchemaService, private layerFieldService: LayerFieldService) {}

  ngOnInit() {
    const expandedSchemasString = localStorage.getItem(this.localStorageKey);
    if (expandedSchemasString) {
      this.expandedSchemas = new Set(JSON.parse(expandedSchemasString));
    }
    this.schemaService
      .getManyReferenced([this.content.contentSchemaId])
      .pipe(take(1))
      .subscribe((schemaDetails) => {
        this.allSchemas = [...this.schemas, ...schemaDetails];

        const contentSchema = this.schemas.find((i) => i.id === this.content.contentSchemaId);
        if (!contentSchema) {
          return;
        }

        const isVirtualContent = this.content.isVirtual();
        const schemas = this.showContentSchema && isVirtualContent ? [this.content.contentSchemaId] : [];

        if (contentSchema.layerSchemaIds) {
          schemas.push(...contentSchema.layerSchemaIds.filter((lsi) => !this.excludedLayerSchemaIds?.includes(lsi)));
        }

        if (this.showContentSchema && !isVirtualContent) {
          schemas.push(this.content.contentSchemaId);
        }

        schemas.forEach((layerSchemaId) => {
          const schema: SchemaDetail | undefined = this.schemas.find((i) => i.id === layerSchemaId);
          if (!schema) {
            return;
          }

          const schemaMetadata =
            schema.id === this.content.contentSchemaId
              ? this.content.content
              : this.content.metadata && this.content.metadata[this.toLowerCamel(schema.id)];

          if (!schemaMetadata || !schema.fields) {
            return;
          }

          const layer: Layer = {
            id: schema.id,
            names: schema.names,
            fields: [],
            expanded: this.expandedSchemas.has(schema.id),
          };

          schema.fields.forEach((schemaField) => {
            if (schemaMetadata[schemaField.id]) {
              const layerField = this.layerFieldService.generate(schemaField, schemaMetadata, this.allSchemas);

              if (layerField) {
                layer.fields.push(layerField);
              }
            }
          });

          this.layers.push(layer);
        });
      });
  }

  public relationClickHandler(relationInfo: RelationFieldInfo) {
    this.relationClick.emit(relationInfo);
  }

  public layerExpansionHandlder(layerId: string, opened: boolean) {
    if (opened) {
      this.expandedSchemas.add(layerId);
    } else {
      this.expandedSchemas.delete(layerId);
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(Array.from(this.expandedSchemas)));
  }

  toLowerCamel(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
}
