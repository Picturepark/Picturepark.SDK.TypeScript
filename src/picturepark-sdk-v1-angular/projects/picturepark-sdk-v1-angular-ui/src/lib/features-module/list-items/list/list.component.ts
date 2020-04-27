import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, flatMap, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

// ANGULAR CDK
import { MediaMatcher } from '@angular/cdk/layout';

// LIBRARIES
import {
  AggregationFilter,
  AndFilter,
  FilterBase,
  OrFilter,
  SchemaDetail,
  SchemaService,
  ListItem,
  ListItemSearchFacade,
} from '@picturepark/sdk-v1-angular';
import { groupBy } from '../../../utilities/helper';
import { ListBrowserComponent } from '../../list-browser/list-browser.component';

@Component({
  selector: 'pp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(ListBrowserComponent) listBrowserComponent: ListBrowserComponent;
  @Input() activeSchema: Subject<SchemaDetail | null>;
  @Output() queryChange = new EventEmitter<Params>();

  public mobileQuery: MediaQueryList;
  public aggregationFilters: AggregationFilter[] = [];
  public searchQuery: Observable<string>;
  public filter: BehaviorSubject<FilterBase | null>;
  public schemaDetail: SchemaDetail | undefined;
  public schema: Observable<SchemaDetail>;
  public selectedItems: ListItem[];
  public selectedItemsIds: string[];

  private subscription = new Subscription();

  constructor(
    private media: MediaMatcher,
    private schemaService: SchemaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public facade: ListItemSearchFacade
  ) {
    this.filter = new BehaviorSubject(null);
  }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    this.schema = this.route.paramMap.pipe(
      flatMap((paramMap) => {
        const schemaId = paramMap.get('id')!;
        return this.schemaService.get(schemaId);
      })
    );

    this.searchQuery = this.route.queryParamMap.pipe(
      map((q) => q.get('listsearch')),
      distinctUntilChanged(),
      tap(() => this.deselectSelectedItems()),
      map((query) => query || '')
    );

    const listSubscription = combineLatest([this.schema, this.route.paramMap, this.route.queryParamMap])
      .pipe(take(1))
      .subscribe(([schemaDetail, paramMap, queryParamMap]) => {
        this.activeSchema.next(schemaDetail);
        this.schemaDetail = schemaDetail;

        const filterQuery = queryParamMap.getAll('filter');
        if (filterQuery) {
          if (typeof filterQuery === 'string') {
            this.aggregationFilters = [AggregationFilter.fromJS(JSON.parse(filterQuery))];
          } else {
            this.aggregationFilters = filterQuery.map((fq) => AggregationFilter.fromJS(JSON.parse(fq)));
          }
          const createdFilter = this.createFilter(this.aggregationFilters);
          this.filter.next(createdFilter!);
        }

        // Get selected from url
        const selectedQuery = queryParamMap.get('selected');
        if (selectedQuery) {
          const items = selectedQuery.split(',');
          this.selectedItemsIds = items;
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

  public selectedItemsChange(selectedItems: ListItem[]) {
    this.selectedItems = selectedItems;
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public changeAggregationFilters(aggregationFilters: AggregationFilter[]): void {
    this.deselectSelectedItems();
    this.aggregationFilters = aggregationFilters;
    const filtersQuery = this.aggregationFilters.map((filter) => JSON.stringify(filter.toJSON()));

    const query = this.queryParams;

    if (filtersQuery.length > 0) {
      query['filter'] = filtersQuery;
    } else {
      delete query['filter'];
    }

    this.queryChange.emit(query);
  }

  private createFilter(aggregationFilters: AggregationFilter[]): FilterBase | null {
    const flatten = groupBy(aggregationFilters, (i) => i.aggregationName);
    const preparedFilters = Array.from(flatten)
      .map((array) => {
        const filtered = array[1]
          .filter((aggregationFilter) => aggregationFilter.filter)
          .map((aggregationFilter) => aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0:
            return null;
          case 1:
            return filtered[0];
          default:
            return new OrFilter({ filters: filtered });
        }
      })
      .filter((value) => value !== null);

    switch (preparedFilters.length) {
      case 0:
        return null;
      case 1:
        return preparedFilters[0]!;
      default:
        return new AndFilter({ filters: preparedFilters as FilterBase[] });
    }
  }

  private deselectSelectedItems() {
    if (this.listBrowserComponent) {
      this.listBrowserComponent.deselectAll();
    }
  }
}
