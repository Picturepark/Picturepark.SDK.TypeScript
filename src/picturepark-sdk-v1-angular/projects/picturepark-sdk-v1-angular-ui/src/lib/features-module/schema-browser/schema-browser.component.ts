import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
  Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subject, Subscription, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// LIBRARIES
import {
  FilterBase, OrFilter, PrefixFilter, Schema, SchemaSearchRequest, SchemaSearchResult,
  SchemaService, SearchBehavior, SortDirection, SortInfo, TermFilter
} from '@picturepark/sdk-v1-angular';

// INTERFACES
import { SchemaSortingType } from './interfaces/schema-sorting-type.enum';

@Component({
  selector: 'pp-schema-browser',
  templateUrl: './schema-browser.component.html',
  styleUrls: ['./schema-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchemaBrowserComponent implements OnInit, OnDestroy {

  @Input() public search: Subject<string>;
  @Input() public filter: Subject<FilterBase>;
  @Input() public activeParentSchema: BehaviorSubject<Schema>;
  @Output() public activeSchemaChange = new EventEmitter<Schema>();

  public SchemaSortingType = SchemaSortingType;
  public SortDirection = SortDirection;
  public nextPageToken: string | undefined;
  public activeSortingType = new BehaviorSubject<string>(SchemaSortingType.relevance);
  public activeSortDirection = new BehaviorSubject<SortDirection>(SortDirection.Asc);

  public totalResults: number | null = null;
  public schemas: Schema[] = [];
  private parentSchema: Schema | null = null;
  private subscription = new Subscription();
  private itemsPerRequest = 200;

  constructor(
    private schemaService: SchemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    console.log(this.search);
    console.log(this.filter);
    console.log(this.activeParentSchema);
    console.log(this.activeSortingType);
    console.log(this.activeSortDirection)
    // tslint:disable-next-line: deprecation
    const schemaSearchResult = combineLatest(
      this.activeSortingType,
      this.activeSortDirection,
      this.filter,
      this.search,
      this.activeParentSchema).pipe(
        switchMap(([activeSortingType, activeSortDirection, filter, search, activeParentSchema]) => {

        console.log(activeParentSchema);

        if (activeParentSchema) {
          filter = new OrFilter({
            filters: [
              new PrefixFilter({ field: 'schemaNamespace', prefix: `${activeParentSchema.id}.` }),
              new TermFilter({ field: 'id', term: activeParentSchema.id! })
            ]
          });
          search = '';
        }

        const request = new SchemaSearchRequest({
          debugMode: false,
          pageToken: undefined,
          limit: this.itemsPerRequest,
          filter: filter ? filter : undefined,
          searchString: search,
          searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
          sort: activeSortingType === SchemaSortingType.relevance ? [] : [
            new SortInfo({
              field: activeSortingType,
              direction: activeSortDirection
            })
          ]
        });

        return zip(of(activeParentSchema), this.schemaService.search(request));

      })).subscribe(([activeParentSchema, result]: [Schema, SchemaSearchResult]) => {

        console.log(activeParentSchema);
        console.log(result);

        this.parentSchema = activeParentSchema;
        this.totalResults = result.totalResults;
        this.schemas = result.results;
        this.cdr.detectChanges();
      });

    this.subscription.add(schemaSearchResult);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setSortingType(newValue: SchemaSortingType) {
    this.activeSortingType.next(newValue);
  }

  public update(sortDirection: SortDirection) {
    this.activeSortDirection.next(sortDirection);
  }

  public setUpActiveSchema(schema: Schema) {
    if (schema.childCount > 0 && !this.parentSchema) {
      this.activeParentSchema.next(schema);
    } else {
      this.activeSchemaChange.emit(schema);
    }
  }

  public trackById(index: number, schema: Schema) {
    return schema.id;
  }
}
