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
import { distinctUntilChanged, filter, mergeMap, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  AggregationFilter,
  AndFilter,
  FilterBase,
  OrFilter,
  SchemaDetail,
  SchemaService,
  ListItem,
  ListItemSearchFacade,
} from '@picturepark/sdk-v2-angular';
import { groupBy } from '../../../utilities/helper';
import { ListBrowserComponent } from '../../list-browser/list-browser.component';
import { TranslatePipe } from '../../../shared-module/pipes/translate.pipe';
import { AggregationListComponent } from '../../../shared-module/components/aggregation-list/aggregation-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ListBrowserComponent, MatTabsModule, AggregationListComponent, TranslatePipe],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(ListBrowserComponent) listBrowserComponent: ListBrowserComponent;
  @Input() activeSchema: Subject<SchemaDetail | null>;
  @Output() queryChange = new EventEmitter<Params>();

  mobileQuery: MediaQueryList;
  aggregationFilters: AggregationFilter[] = [];
  searchQuery: Observable<string>;
  filter: BehaviorSubject<FilterBase | null>;
  schemaDetail: SchemaDetail | undefined;
  schema: Observable<SchemaDetail>;
  selectedItems: ListItem[];
  selectedItemsIds: string[];

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
      filter(p => !!p.get('id')),
      mergeMap(paramMap => {
        const schemaId = paramMap.get('id') ?? '';
        return this.schemaService.get(schemaId);
      })
    );

    this.searchQuery = this.route.queryParamMap.pipe(
      map(q => q.get('listsearch')),
      distinctUntilChanged(),
      tap(() => this.deselectSelectedItems()),
      map(query => query || '')
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
            this.aggregationFilters = filterQuery.map(fq => AggregationFilter.fromJS(JSON.parse(fq)));
          }
          const createdFilter = this.createFilter(this.aggregationFilters);
          this.filter.next(createdFilter);
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

  selectedItemsChange(selectedItems: ListItem[]) {
    this.selectedItems = selectedItems;
  }

  get queryParams() {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  changeAggregationFilters(aggregationFilters: AggregationFilter[]) {
    this.deselectSelectedItems();
    this.aggregationFilters = aggregationFilters;
    const filtersQuery = this.aggregationFilters.map(f => JSON.stringify(f.toJSON()));

    const query = this.queryParams;

    if (filtersQuery.length > 0) {
      query['filter'] = filtersQuery;
    } else {
      delete query['filter'];
    }

    this.queryChange.emit(query);
  }

  private createFilter(aggregationFilters: AggregationFilter[]) {
    const flatten = groupBy(aggregationFilters, i => i.aggregationName);
    const preparedFilters = Array.from(flatten)
      .map(array => {
        const filtered = array[1]
          .filter(aggregationFilter => aggregationFilter.filter)
          .map(aggregationFilter => aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0:
            return null;
          case 1:
            return filtered[0];
          default:
            return new OrFilter({ filters: filtered });
        }
      })
      .filter(value => value !== null);

    switch (preparedFilters.length) {
      case 0:
        return null;
      case 1:
        return preparedFilters[0];
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
