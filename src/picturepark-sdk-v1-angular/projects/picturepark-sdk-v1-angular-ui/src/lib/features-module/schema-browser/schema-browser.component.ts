import { Component, EventEmitter, Input, OnInit, Output, Injector, SimpleChanges, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// LIBRARIES
import {
  OrFilter, PrefixFilter, Schema, SchemaSearchRequest,
  SchemaService, SearchBehavior, SortDirection, SortInfo, TermFilter, FilterBase, SchemaSearchResult
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';

@Component({
  selector: 'pp-schema-browser',
  templateUrl: './schema-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './schema-browser.component.scss'
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaBrowserComponent extends BaseBrowserComponent<Schema> implements OnInit, OnChanges {

  @Input() public activeParentSchema: BehaviorSubject<Schema>;
  @Output() public activeSchemaChange = new EventEmitter<Schema>();

  public selectedSchemaIndex: number;
  private parentSchema: Schema | null = null;

  constructor(
    private schemaService: SchemaService,
    injector: Injector
  ) {
    super('SchemaBrowserComponent', injector);
  }

  async init(): Promise<void> {
    const parentChange = this.activeParentSchema.subscribe(schema => {
      this.parentSchema = schema;
      this.update();
    });
    this.subscription.add(parentChange);
  }

  initSort(): void {
    this.sortingTypes = [
      {
        field: 'relevance',
        name: this.translationService.translate('SortMenu.Relevance')
      }, {
        field: 'names.en', // TODO BRO: Fix
        name: this.translationService.translate('SortMenu.FileName')
      }, {
        field: 'audit.creationDate',
        name: this.translationService.translate('SortMenu.CreationDate')
      }, {
        field: 'audit.modificationDate',
        name: this.translationService.translate('SortMenu.ModificationDate')
      }
    ];
    this.activeSortingType = this.sortingTypes[0];

    this.views = [{
      name: 'Small',
      icon: 'collections',
      type: 'thumbnailSmall'
    }];
    this.activeView = this.views[0];
  }

  onScroll(): void {
    this.loadData();
  }

  getSearchRequest(): Observable<SchemaSearchResult> | undefined {
    let filter: FilterBase | null = null;
    if (this.parentSchema) {
      filter = new OrFilter({
        filters: [
          new PrefixFilter({ field: 'schemaNamespace', prefix: this.parentSchema.id }),
          new TermFilter({ field: 'id', term: this.parentSchema.id! })
        ]
      });
      this.searchString = '';
    }

    const request = new SchemaSearchRequest({
      debugMode: false,
      pageToken: this.nextPageToken,
      limit: this.pageSize,
      filter: filter ? filter : this.filter!,
      searchString: this.searchString,
      searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
      sort: this.activeSortingType.field === 'relevance' ? [] : [
        new SortInfo({
          field: this.activeSortingType.field,
          direction: this.isAscending ? SortDirection.Asc : SortDirection.Desc
        })
      ]
    });

    return this.schemaService.search(request);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] || changes['searchString']) {
      this.update();
    }
  }

  checkContains(elementClassName: string): boolean {
    const containClasses = ['browser__items'];
    return containClasses.some(iClass => elementClassName.includes(iClass));
  }

  public setUpActiveSchema(schema: Schema): void {
    if (schema.childCount > 0 && !this.parentSchema) {
      this.activeParentSchema.next(schema);
    } else {
      this.activeSchemaChange.emit(schema);
    }
  }

  public selectedSchemaChange(index: number): void {
    this.selectedSchemaIndex = index;
  }
}
