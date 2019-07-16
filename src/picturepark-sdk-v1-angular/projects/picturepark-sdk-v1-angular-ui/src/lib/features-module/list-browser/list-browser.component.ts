import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  EventEmitter, Input, NgZone, OnDestroy, OnInit, Output
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, zip } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ANGULAR CDK
import { SelectionModel } from '@angular/cdk/collections';
import { ScrollDispatcher } from '@angular/cdk/overlay';

// LIBRARIES
import {
  BrokenDependenciesFilter,
  FilterBase,
  InfoService,
  LifeCycleFilter,
  ListItemSearchRequest,
  ListItemService,
  SchemaDetail,
  SearchBehavior,
  SortDirection,
  SortInfo,
  ListItemResolveBehavior,
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';

// SERVICES
import { MetaDataPreviewService } from '../../shared-module/services/metadata-preview/metadata-preview.service';

// PIPES
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';

@Component({
  selector: 'pp-list-browser',
  templateUrl: './list-browser.component.html',
  styleUrls: ['./list-browser.component.scss'],
  providers: [ TranslatePipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBrowserComponent implements OnInit, OnDestroy {

  @Input() schema: Observable<SchemaDetail>;
  @Input() search: Observable<string>;
  @Input() selectedItemIds: string[] | any;
  @Input() filter: Observable<FilterBase>;
  @Input() enableSelection: boolean;
  @Input() deselectAll: Observable<boolean>;

  @Output() selectedItemsChange = new EventEmitter<string[]>();

  public totalResults: number;
  public tableItems: any[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[];
  public displayedColumnNames: any[];
  public nextPageToken: string | undefined;
  public loadMore = new BehaviorSubject(false);
  public activeSortColumn: string;
  public activeSortDirection: string;
  public selection = new SelectionModel<any>(true, []);

  private readonly itemsPerRequest = 50;
  private subscription = new Subscription();
  private sortInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  private schemaDetail: SchemaDetail;

  constructor(
    private listItemService: ListItemService,
    private metaDataPreviewService: MetaDataPreviewService,
    private scrollDispatcher: ScrollDispatcher,
    private infoService: InfoService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const scrollSubscription = this.scrollDispatcher.scrolled().pipe(debounceTime(100)).subscribe(scrollable => {
      if (scrollable) {

        const nativeElement = scrollable.getElementRef().nativeElement as HTMLElement;
        const scrollCriteria = nativeElement.scrollTop > nativeElement.scrollHeight - (2 * nativeElement.clientHeight);

        if (scrollCriteria && this.tableItems.length !== this.totalResults) {
          this.ngZone.run(() => this.loadMore.next(true));
        }
      }
    });

    this.subscription.add(scrollSubscription);

    let prevFilter: FilterBase;
    let prevQuery: string;

    const listSubscription = combineLatest([
      this.sortInfo,
      this.loadMore,
      this.schema,
      this.filter,
      this.search,
      this.infoService.getInfo()]).pipe(
          switchMap(
            ([sortInfo, loadMore, schema, nextFilter, nextQuery, info]) => {
              const needDataRefresh = prevFilter !== nextFilter || prevQuery !== nextQuery;
              prevFilter = nextFilter;
              prevQuery = nextQuery;

              // check default sort for the schema
              let sort: SortInfo[] = [];

              // use to show sorting on the table
              let activeColumn: { name: string | undefined; direction: string; } | null = null;

              if (!sortInfo) {
                if (schema.sort && schema.sort.length > 0) {
                  // get first as mat table does not support multiple sorting
                  const name = schema.sort[0].field;
                  const direction = schema.sort[0].direction.toLowerCase();
                  activeColumn = { name: name, direction: direction };

                  sort = schema.sort.map((s) => {
                    return new SortInfo({
                      field: lodash.lowerFirst(schema.id) + '.' + s.field,
                      direction: s.direction.toLowerCase() === 'asc' ? SortDirection.Asc : SortDirection.Desc
                    });
                  });
                }
              }

              const request = new ListItemSearchRequest({
                pageToken: needDataRefresh ? undefined : this.nextPageToken,
                limit: this.itemsPerRequest,
                searchString: nextQuery,
                sort: sortInfo ? [sortInfo] : sort,
                searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
                schemaIds: [schema.id],
                filter: nextFilter ? nextFilter : undefined,
                includeAllSchemaChildren: true,
                brokenDependenciesFilter: BrokenDependenciesFilter.All,
                debugMode: false,
                lifeCycleFilter: LifeCycleFilter.ActiveOnly,
                resolveBehaviors: [ListItemResolveBehavior.Content, ListItemResolveBehavior.InnerDisplayValueName]
              });

              return zip(of(needDataRefresh), of(schema), of(activeColumn), of(info), this.listItemService.search(request));
        })).subscribe(
          ([needDataRefresh, schema, activeColumn, info, listItemResult]) => {

            this.schemaDetail = schema;
            this.nextPageToken = listItemResult.pageToken;
            this.totalResults = listItemResult.totalResults;

            const metadataItems = listItemResult.results.map(m => Object.assign(m.content, { id: m.id }));
            const items = this.metaDataPreviewService.getListItemsTableData(metadataItems, schema, info);

            if (activeColumn) {
              // mark column header as sorted
              this.activeSortColumn = activeColumn.name!;
              this.activeSortDirection = activeColumn.direction;
            }

            if (needDataRefresh) {
              this.tableItems = [];
              // need to show column names
              this.displayedColumnNames = schema.fields!.map(field => {
                const id = lodash.last(field.id.split('.'));
                const names = field.names;
                return { id, names, field };
              });

              this.displayedColumns = schema.fields!.map(field => {
                const id = lodash.last(field.id.split('.'));
                return id!;
              });
              if (this.enableSelection) {
                this.displayedColumns.unshift('select');
              }
            }

            this.tableItems.push(...items);

            this.dataSource.data = this.tableItems;
            const selected = this.tableItems.filter(i => this.selectedItemIds && this.selectedItemIds.indexOf(i._refId) !== -1);
            selected.forEach(row => this.selection.toggle(row));

            this.cdr.detectChanges();

          }
        );

    this.subscription.add(listSubscription);

    if (this.deselectAll) {
      const deselectAllSubscription = this.deselectAll.subscribe(() => {
        this.selection.clear();
        this.selectedItemsChange.emit(this.selection.selected.map(x => x.id));
        this.cdr.detectChanges();
      });

      this.subscription.add(deselectAllSubscription);
    }
  }

  sortData(sort: Sort) {
    this.nextPageToken = undefined;
    this.tableItems = [];
    const sortInfo = new SortInfo({
      field: lodash.lowerFirst(this.schemaDetail.id) + '.' + sort.active,
      direction: sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc
    });
    this.sortInfo.next(sortInfo);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

    this.selectedItemsChange.emit(this.selection.selected.map(x => x.id));
  }

  public toggle(row: any) {
    this.selection.toggle(row);
    this.selectedItemsChange.emit(this.selection.selected.map(x => x.id));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public rowClick(row: any): void {
    if (this.enableSelection) {
      this.toggle(row);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public myTrackById(index: number, item: any) {
    return item['_refId'] || index;
  }
}
