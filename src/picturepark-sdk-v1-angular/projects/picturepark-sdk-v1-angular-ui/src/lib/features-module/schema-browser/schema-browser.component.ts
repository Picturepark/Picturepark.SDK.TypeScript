import { Component, EventEmitter, Injector, Output } from '@angular/core';
// LIBRARIES
import { Schema, SchemaSearchFacade } from '@picturepark/sdk-v1-angular';
// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';

@Component({
  selector: 'pp-schema-browser',
  templateUrl: './schema-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './schema-browser.component.scss',
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaBrowserComponent extends BaseBrowserComponent<Schema> {
  @Output() public activeSchemaChange = new EventEmitter<Schema>();
  @Output() public parentSchemaChange = new EventEmitter<Schema>();

  public selectedSchemaId: string;

  constructor(public facade: SchemaSearchFacade, injector: Injector) {
    super('SchemaBrowserComponent', injector, facade);
  }

  async init(): Promise<void> {
    // Trigger load
    this.facade.patchRequestState({});
  }

  initSort(): void {
    this.sortingTypes = [
      {
        field: 'relevance',
        name: this.translationService.translate('SortMenu.Relevance'),
      },
      {
        field: 'names.en', // TODO BRO: Fix
        name: this.translationService.translate('SortMenu.FileName'),
      },
      {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate'),
      },
      {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate'),
      },
    ];
    this.activeSortingType = this.sortingTypes[0];

    this.views = [
      {
        name: 'Small',
        icon: 'collections',
        type: 'thumbnailSmall',
      },
    ];
    this.activeView = this.views[0];
  }

  onScroll(): void {
    this.loadData();
  }

  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some((iClass) => elementClassName.includes(iClass));
  }

  public setUpActiveSchema(schema: Schema): void {
    if (schema.childCount > 0 && schema.id !== this.facade.searchRequestState.parentSchema?.id) {
      this.parentSchemaChange.emit(schema);
    } else {
      this.activeSchemaChange.emit(schema);
    }
  }

  public onItemSelected(schemaId: string): void {
    this.selectedSchemaId = schemaId;
  }
}
