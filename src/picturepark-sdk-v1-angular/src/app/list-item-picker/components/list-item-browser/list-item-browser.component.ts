import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

// LIBRARIES
import {
  SchemaDetail, FilterBase, SchemaService, AuthService,
  AggregationFilter, AggregatorBase, OrFilter, AndFilter
} from '@picturepark/sdk-v1-angular';
import { OidcAuthService } from '@picturepark/sdk-v1-angular-oidc';
import * as lodash from 'lodash';

@Component({
  selector: 'app-list-item-browser',
  templateUrl: './list-item-browser.component.html',
  styleUrls: ['./list-item-browser.component.scss']
})
export class ListItemBrowserComponent implements OnInit, OnDestroy {

  @Input() activeSchema = new Subject<SchemaDetail>();
  public aggregations: AggregatorBase[] | undefined;
  public aggregationFilters: AggregationFilter[] = [];
  public deselectAll = new Subject<void>();
  public filter = new Subject<FilterBase>();
  public refreshAll = new Observable<boolean>();
  public searchQuery: Observable<string>;
  public selectedItems: string[];
  public schema: Observable<SchemaDetail>;
  public schemaDetail: SchemaDetail;
  public schemaId: string | null;

  private subscription = new Subscription();

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private schemaService: SchemaService,
    @Inject(AuthService) public authService: OidcAuthService
  ) {}

  public selectedItemsChange(selectedItems: string[]): void {
    this.selectedItems = selectedItems;
  }

  private deselectSelectedItems(): void {
    this.deselectAll.next();
  }

  ngOnInit() {

    if (!this.authService.isAuthenticated) {
      this.authService.login('/list-item-picker');
    }

    // ROUTE SUBSCRIBER
    const routeSubscriber = this.route.params.subscribe(params => {
      this.schema = this.schemaService.get(params.id);
    });

    // tslint:disable-next-line: deprecation
    const listSubscription = combineLatest(this.schema, this.route.paramMap, this.route.queryParamMap)
      .pipe(take(1))
      .subscribe(([schemaDetail, paramMap, queryParamMap]) => {

        this.activeSchema.next(schemaDetail);
        this.schemaDetail = schemaDetail;
        this.aggregations = schemaDetail.aggregations;
        this.schemaId = paramMap.get('id');

        const filterQuery = queryParamMap.getAll('filter');
        if (filterQuery) {
          if (typeof filterQuery === 'string') {
            this.aggregationFilters = [AggregationFilter.fromJS(JSON.parse(filterQuery))];
          } else {
            this.aggregationFilters = (filterQuery as string[]).map(fq => AggregationFilter.fromJS(JSON.parse(fq)));
          }
          const createdFilter = this.createFilter(this.aggregationFilters);
          if (createdFilter) {
            this.filter.next(createdFilter);
          }
        }

        // Get selected from url
        const selectedQuery = queryParamMap.get('selected');
        if (selectedQuery) {
          const items = selectedQuery.split(',');
          this.selectedItems = items;
        }

        if (this.router.isActive(`list-items/${this.schemaId}/export`, false)) {
          // this.export();
        }

        this.cdr.detectChanges();
      });

    this.searchQuery = this.route.queryParamMap.pipe(map(q =>
      q.get('listsearch')),
      distinctUntilChanged(),
      tap(() => this.deselectSelectedItems()),
      map((query) => query || ''));

    // ADD SUBSCRIBERS TO SUBSCRIPTIONS
    this.subscription.add(routeSubscriber);
    this.subscription.add(listSubscription);

  }

  private createFilter(aggregationFilters: AggregationFilter[]): FilterBase | null {

    const flatten = lodash.chain(aggregationFilters).groupBy('aggregationName').toPairs().value();
    const preparedFilters = flatten.map(array => {

      const filtered = array[1].filter(aggregationFilter =>
        aggregationFilter.filter).map(aggregationFilter =>
          aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0: return null;
          case 1: return filtered[0];
          default: return new OrFilter({ filters: filtered });
        }
      }).filter(value => value !== null);

    switch (preparedFilters.length) {
      case 0: return null;
      case 1: return preparedFilters[0];
      default: return new AndFilter({ filters: preparedFilters as FilterBase[] });
    }
  }

  public export() {
    /*
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
    */
  }

  ngOnDestroy() {
    // UNSUBSCRIBE
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
