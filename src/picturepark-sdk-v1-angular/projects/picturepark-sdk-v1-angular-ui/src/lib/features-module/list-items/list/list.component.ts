import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, flatMap, map, take, tap } from 'rxjs/operators';

// ANGULAR CDK
import { MediaMatcher } from '@angular/cdk/layout';

// LIBRARIES
import { MatDialog } from '@angular/material/dialog';
import {
  AggregationFilter,
  AggregatorBase,
  AndFilter,
  FilterBase,
  OrFilter,
  ProfileService,
  SchemaDetail,
  SchemaService,
  UserRight,
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';

// COMPONENTS
import { ListItemsExportComponent } from '../list-items-export/list-items-export.component';
import { ListItemsImportDataService } from '../list-items-import/services/list-items-import-data.service';

@Component({
  selector: 'pp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListItemsImportDataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() activeSchema: Subject<SchemaDetail>;
  public mobileQuery: MediaQueryList;
  public aggregationFilters: AggregationFilter[] = [];
  public isImportActive: Subject<boolean> = new BehaviorSubject(false);
  public searchQuery: Observable<string>;
  public filter = new Subject<FilterBase>();
  public aggregations: AggregatorBase[];
  public schemaDetail: SchemaDetail;
  public schema: Observable<SchemaDetail>;
  public refreshAll: Observable<boolean>;
  public deselectAll: Subject<void> = new Subject<void>();
  public schemaId: string;
  public isImportAllowed: Observable<boolean>;
  public selectedItems: string[];

  private subscription = new Subscription();

  constructor(private media: MediaMatcher,
    private schemaService: SchemaService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private importDataService: ListItemsImportDataService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.isImportAllowed = <Observable<boolean>>this.profileService.get().pipe(
      map(t => t.userRights && t.userRights.indexOf(UserRight.ManageListItems) !== -1));

    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.refreshAll = this.isImportActive.pipe(map((isImportActive: boolean) => isImportActive));

    this.schema = <Observable<SchemaDetail>>this.route.paramMap.pipe(flatMap((paramMap) => {
      const schemaId = paramMap.get('schemaId')!;
      return this.schemaService.get(schemaId);
    }));

    this.searchQuery = this.route.queryParamMap.pipe(
      map(q => q.get('listsearch')), distinctUntilChanged(), tap(() => this.deselectSelectedItems()),
      map((query) => query || ''));

    const listSubscription = combineLatest(
      this.schema,
      this.route.paramMap,
      this.route.queryParamMap).pipe(take(1)).subscribe(
        ([schemaDetail, paramMap, queryParamMap]) => {
        this.activeSchema.next(schemaDetail);
        this.schemaDetail = schemaDetail;
        this.aggregations = schemaDetail.aggregations!;
        this.schemaId = paramMap.get('schemaId')!;

        const filterQuery = queryParamMap.getAll('filter');
        if (filterQuery) {
          if (typeof filterQuery === 'string') {
            this.aggregationFilters = [AggregationFilter.fromJS(JSON.parse(filterQuery))];
          } else {
            this.aggregationFilters = (filterQuery as string[]).map(fq => AggregationFilter.fromJS(JSON.parse(fq)));
          }
          const createdFilter = this.createFilter(this.aggregationFilters);
          this.filter.next(createdFilter!);
        }

        // Get selected from url
        const selectedQuery = queryParamMap.get('selected');
        if (selectedQuery) {
          const items = selectedQuery.split(',');
          this.selectedItems = items;
        }

        if (this.router.isActive(`list-items/${this.schemaId}/export`, false)) {
          this.export();
        }

        this.cdr.detectChanges();
      });

    this.subscription.add(listSubscription);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  import() {
    this.importDataService.changeSchemaId(this.schemaId);
    this.isImportActive.next(true);
  }

  closeImport() {
    this.isImportActive.next(false);
  }

  public selectedItemsChange(selectedItems: string[]) {
    this.selectedItems = selectedItems;
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public export() {
    const dialogRef = this.dialog.open(ListItemsExportComponent, {
      data: {
        schema: of(this.schemaDetail),
        filter: this.filter,
        searchString : this.searchQuery,
        selectedItems: this.selectedItems
      },
      width: '50vw',
    });

    const closeDialogSubscription = dialogRef.afterClosed().subscribe((isExported) => {
      if (isExported) {
        this.deselectSelectedItems();
      }
    });
    this.subscription.add(closeDialogSubscription);
  }

  public changeAggregationFilters(aggregationFilters: AggregationFilter[]) {
    this.deselectSelectedItems();
    this.aggregationFilters = aggregationFilters;
    const filtersQuery = this.aggregationFilters.map(filter => JSON.stringify(filter.toJSON()));

    const query = this.queryParams;

    if (filtersQuery.length > 0) {
      query['filter'] = filtersQuery;
    } else {
      delete query['filter'];
    }

    this.router.navigate(['/list-items', this.schemaId], { queryParams: query });
  }

  private createFilter(aggregationFilters: AggregationFilter[]): FilterBase | null {
    const flatten = lodash.chain(aggregationFilters).groupBy('aggregationName').toPairs().value();
    const preparedFilters = flatten
      .map(array => {
        const filtered = array[1].filter(aggregationFilter => aggregationFilter.filter)
          .map(aggregationFilter => aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0: return null;
          case 1: return filtered[0];
          default: return new OrFilter({ filters: filtered });
        }
      })
      .filter(value => value !== null);

    switch (preparedFilters.length) {
      case 0: return null;
      case 1: return preparedFilters[0]!;
      default: return new AndFilter({ filters: preparedFilters as FilterBase[] });
    }
  }

  private deselectSelectedItems() {
    this.deselectAll.next();
  }
}
