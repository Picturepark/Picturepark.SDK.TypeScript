import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, flatMap, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

// ANGULAR CDK
import { MediaMatcher } from '@angular/cdk/layout';

// LIBRARIES
import {
  AggregationFilter,
  AggregatorBase,
  AndFilter,
  FilterBase,
  OrFilter,
  ProfileService,
  SchemaDetail,
  SchemaService,
  UserRight
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';

@Component({
  selector: 'pp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {

  @Input() activeSchema: Subject<SchemaDetail | null>;
  public mobileQuery: MediaQueryList;
  public aggregationFilters: AggregationFilter[] = [];
  public searchQuery: Observable<string>;
  public filter: BehaviorSubject<FilterBase | null>;
  public aggregations: AggregatorBase[] = [];
  public schemaDetail: SchemaDetail;
  public schema: Observable<SchemaDetail>;
  public deselectAll: Subject<void> = new Subject<void>();
  public schemaId: string;
  public isImportAllowed: Observable<boolean>;
  public selectedItems: string[];

  private subscription = new Subscription();

  constructor(
    private media: MediaMatcher,
    private schemaService: SchemaService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.filter = new BehaviorSubject(null);
  }

  ngOnInit() {

    this.isImportAllowed = <Observable<boolean>>this.profileService.get().pipe(
      map(t => t.userRights && t.userRights.indexOf(UserRight.ManageListItems) !== -1));

    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    this.schema = <Observable<SchemaDetail>>this.route.paramMap.pipe(flatMap((paramMap) => {
      const schemaId = paramMap.get('id')!;
      return this.schemaService.get(schemaId);
    }));

    this.searchQuery = this.route.queryParamMap.pipe(
      map(q => q.get('listsearch')), distinctUntilChanged(), tap(() => this.deselectSelectedItems()),
      map((query) => query || ''));

    // tslint:disable-next-line: deprecation
    const listSubscription = combineLatest(
      this.schema,
      this.route.paramMap,
      this.route.queryParamMap).pipe(take(1)).subscribe(
        ([schemaDetail, paramMap, queryParamMap]) => {
        this.activeSchema.next(schemaDetail);
        this.schemaDetail = schemaDetail;
        this.aggregations = schemaDetail.aggregations!;
        this.schemaId = paramMap.get('id')!;

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

        this.cdr.detectChanges();
      });

    this.subscription.add(listSubscription);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public selectedItemsChange(selectedItems: string[]) {
    this.selectedItems = selectedItems;
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public changeAggregationFilters(aggregationFilters: AggregationFilter[]): void {

    this.deselectSelectedItems();
    this.aggregationFilters = aggregationFilters;
    const filtersQuery = this.aggregationFilters.map(filter => JSON.stringify(filter.toJSON()));

    const query = this.queryParams;

    if (filtersQuery.length > 0) {
      query['filter'] = filtersQuery;
    } else {
      delete query['filter'];
    }

  //  this.router.navigate([this.schemaId], { relativeTo: this.route });
  }

  private createFilter(aggregationFilters: AggregationFilter[]): FilterBase | null {
    const flatten = lodash.chain(aggregationFilters).groupBy('aggregationName').toPairs().value();

    console.log(flatten);

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
