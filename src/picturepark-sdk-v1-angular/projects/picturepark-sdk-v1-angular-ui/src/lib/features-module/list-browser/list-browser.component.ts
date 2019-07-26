import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  Input, OnInit, Injector, SimpleChanges, OnChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ANGULAR CDK
import { SelectionModel } from '@angular/cdk/collections';

// LIBRARIES
import {
  BrokenDependenciesFilter,
  InfoService,
  LifeCycleFilter,
  ListItemSearchRequest,
  ListItemService,
  SchemaDetail,
  SearchBehavior,
  SortDirection,
  SortInfo,
  ListItemResolveBehavior,
  ListItem,
  ListItemSearchResult,
  CustomerInfo,
} from '@picturepark/sdk-v1-angular';

// SERVICES
import { MetaDataPreviewService } from '../../shared-module/services/metadata-preview/metadata-preview.service';

// PIPES
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { ContentModel } from '../../shared-module/models/content-model';
import { lowerFirst } from '../../utilities/helper';

@Component({
  selector: 'pp-list-browser',
  templateUrl: './list-browser.component.html',
  styleUrls: ['./list-browser.component.scss'],
  providers: [ TranslatePipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBrowserComponent extends BaseBrowserComponent<ListItem> implements OnInit, OnChanges {
  @Input() schema: SchemaDetail;
  @Input() selectedItemIds: string[] | any;
  @Input() enableSelection: boolean;
  @Input() deselectAll: Observable<boolean>;
  @Input() sortInfo: SortInfo[];

  public tableItems: any[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[];
  public displayedColumnNames: any[];
  public activeSortColumn: string;
  public activeSortDirection: string;
  public selection = new SelectionModel<ListItem>(true, []);
  public customerInfo: CustomerInfo;

  constructor(
    private listItemService: ListItemService,
    private metaDataPreviewService: MetaDataPreviewService,
    private infoService: InfoService,
    private cdr: ChangeDetectorRef,
    injector: Injector
  ) {
    super('ListBrowserComponent', injector);
  }

  async init(): Promise<void> {
    this.scrollDebounceTime = 100;
    this.customerInfo = await this.infoService.getInfo().toPromise();

    if (this.deselectAll) {
      const deselectAllSubscription = this.deselectAll.subscribe(() => {
        this.selection.clear();
        this.selectedItemsChange.emit(this.selection.selected);
        this.cdr.detectChanges();
      });

      this.subscription.add(deselectAllSubscription);
    }

    // need to show column names
    this.displayedColumnNames = this.schema.fields!.map(field => {
      const id = field.id.split('.').pop();
      const names = field.names;
      return { id, names, field };
    });

    this.displayedColumns = this.schema.fields!.map(field => {
      const id = field.id.split('.').pop();
      return id!;
    });

    if (this.enableSelection) {
      this.displayedColumns.unshift('select');
    }

    // Init default schema sort
    if (!this.sortInfo) {
      if (this.schema.sort && this.schema.sort.length > 0) {
        // get first as mat table does not support multiple sorting
        const name = this.schema.sort[0].field;
        const direction = this.schema.sort[0].direction.toLowerCase();
        this.activeSortColumn = name!;
        this.activeSortDirection = direction;

        this.sortInfo = this.schema.sort.map((s) => {
          return new SortInfo({
            field: lowerFirst(this.schema.id) + '.' + s.field,
            direction: s.direction.toLowerCase() === 'asc' ? SortDirection.Asc : SortDirection.Desc
          });
        });
      }
    }

    this.loadData();
  }

  initSort(): void {
  }

  onScroll(): void {
    this.loadData();
  }

  getSearchRequest(): Observable<ListItemSearchResult> | undefined {
    const request = new ListItemSearchRequest({
      pageToken: this.nextPageToken,
      limit: this.pageSize,
      searchString: this.searchString,
      sort: this.sortInfo,
      searchBehaviors: [SearchBehavior.DropInvalidCharactersOnFailure, SearchBehavior.WildcardOnSingleTerm],
      schemaIds: [this.schema.id],
      filter: this.filter ? this.filter : undefined,
      includeAllSchemaChildren: true,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      debugMode: false,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      resolveBehaviors: [ListItemResolveBehavior.Content, ListItemResolveBehavior.InnerDisplayValueName]
    });

    return this.listItemService.search(request);
  }

  checkContains(elementClassName: string): boolean {
    return true;
  }

  prepareData(items: ContentModel<ListItem>[]): void {
    const metadataItems = items.map(m => Object.assign(m.item.content, { id: m.item.id }));
    const tableItems = this.metaDataPreviewService.getListItemsTableData(metadataItems, this.schema, this.customerInfo);
    this.tableItems.push(...tableItems);

    this.dataSource.data = this.tableItems;
    const selected = this.tableItems.filter(i => this.selectedItemIds && this.selectedItemIds.indexOf(i._refId) !== -1);
    selected.forEach(row => this.selection.toggle(row));

    this.cdr.detectChanges();
  }

  public update(): void {
    this.tableItems = [];
    super.update();
  }

  sortData(sort: Sort) {
    const sortInfo = new SortInfo({
      field: lowerFirst(this.schema.id) + '.' + sort.active,
      direction: sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc
    });
    this.sortInfo = [sortInfo];
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['schema'] && !changes['schema'].firstChange) ||
      (changes['filter'] && !changes['filter'].firstChange) ||
      (changes['searchString'] && !changes['searchString'].firstChange)
    ) {
      this.update();
    }
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

    this.selectedItemsChange.emit(this.selection.selected);
  }

  public toggle(row: any) {
    this.selection.toggle(row);
    this.selectedItemsChange.emit(this.selection.selected);
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
}
