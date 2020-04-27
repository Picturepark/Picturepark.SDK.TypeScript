import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Injector } from '@angular/core';
import { Sort, SortDirection as MatSortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// LIBRARIES
import {
  InfoService,
  SchemaDetail,
  SortInfo,
  ListItem,
  CustomerInfo,
  SortDirection,
  ListItemSearchFacade,
  InfoFacade,
} from '@picturepark/sdk-v1-angular';

// SERVICES
import { MetaDataPreviewService } from '../../shared-module/services/metadata-preview/metadata-preview.service';

// PIPES
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { BaseBrowserComponent } from '../../shared-module/components/browser-base/browser-base.component';
import { lowerFirst } from '../../utilities/helper';

@Component({
  selector: 'pp-list-browser',
  templateUrl: './list-browser.component.html',
  styleUrls: [
    '../../shared-module/components/browser-base/browser-base.component.scss',
    './list-browser.component.scss',
    './list-browser.component.theme.scss',
  ],
  providers: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBrowserComponent extends BaseBrowserComponent<ListItem> implements OnInit {
  @Input() schema: SchemaDetail;
  @Input() selectedItemIds: string[];
  @Input() enableSelection: boolean;
  @Input() sortInfo: SortInfo[];

  public tableItems: any[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[];
  public displayedColumnNames: any[];
  public activeSortColumn: string;
  public activeSortDirection: MatSortDirection;
  public customerInfo: CustomerInfo;

  constructor(
    private metaDataPreviewService: MetaDataPreviewService,
    private infoFacade: InfoFacade,
    private cdr: ChangeDetectorRef,
    public facade: ListItemSearchFacade,
    injector: Injector
  ) {
    super('ListBrowserComponent', injector, facade);
  }

  async init(): Promise<void> {
    this.scrollDebounceTime = 100;
    this.customerInfo = await this.infoFacade.getInfo().toPromise();

    // need to show column names
    this.displayedColumnNames = this.schema.fields!.map((field) => {
      const id = field.id.split('.').pop();
      const names = field.names;
      return { id, names, field };
    });

    this.displayedColumns = this.schema.fields!.map((field) => {
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
        this.activeSortDirection = this.schema.sort[0].direction.toLowerCase() as MatSortDirection;
        this.activeSortColumn = name!;

        this.sortInfo = this.schema.sort.map((s) => {
          return new SortInfo({
            field: lowerFirst(this.schema.id) + '.' + s.field,
            direction: s.direction.toLowerCase() === 'asc' ? SortDirection.Asc : SortDirection.Desc,
          });
        });
      }
    }

    this.facade.patchRequestState({ schemaIds: [this.schema.id], aggregators: this.schema.aggregations ?? [] });
  }

  initSort(): void {}

  onScroll(): void {
    this.loadData();
  }

  checkContains(elementClassName: string): boolean {
    return false;
  }

  prepareData(items: ListItem[]): void {
    const metadataItems = items.map((m) => m.content);
    const tableItems = this.metaDataPreviewService.getListItemsTableData(metadataItems, this.schema, this.customerInfo);
    this.tableItems.push(...tableItems);

    this.dataSource.data = this.tableItems;
    const selected = this.items.filter(
      (listItem) => this.selectedItemIds && this.selectedItemIds.indexOf(listItem.id) !== -1
    );
    this.selectionService.addItems(selected.map((q) => q));

    this.cdr.detectChanges();
  }

  public update(): void {
    this.tableItems = [];
    super.update();
  }

  public deselectAll() {
    this.selectionService.clear();
    this.cdr.detectChanges();
  }

  sortData(sort: Sort) {
    const sortInfo = new SortInfo({
      field: lowerFirst(this.schema.id) + '.' + sort.active,
      direction: sort.direction === 'asc' ? SortDirection.Asc : SortDirection.Desc,
    });
    this.sortInfo = [sortInfo];
    this.update();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    return this.selectedItems.length === this.items.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected() ? this.selectionService.clear() : this.selectionService.addItems(this.items.map((q) => q));
  }

  public isRowSelected(row: any): boolean {
    return this.selectionService.getById(row._refId) ? true : false;
  }

  public toggle(row: any) {
    const index = this.items.findIndex((item) => item.id === row._refId);
    const itemModel = this.items[index];
    this.selectionService.toggle(itemModel);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.isRowSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public rowClick(row: any): void {
    if (this.enableSelection) {
      this.toggle(row);
    }
  }
}
