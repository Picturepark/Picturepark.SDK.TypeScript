import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// ANGULAR CDK
import { MediaMatcher } from '@angular/cdk/layout';

// LIBRARIES
import {
  AndFilter,
  ExistsFilter,
  FilterBase,
  NotFilter,
  Schema,
  SchemaDetail,
  TermsFilter,
} from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss']
})
export class SchemasComponent implements OnInit {

  public mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public activeSchemaId: Observable<string>;
  public search: Observable<string>;
  public listItemsSearch: Observable<string>;
  public filter: BehaviorSubject<FilterBase>;

  // use for breadcrumb
  public activeSchema = new Subject<SchemaDetail | null>();
  public activeParentSchema = new Subject<Schema | null>();

  constructor(private route: ActivatedRoute, private router: Router, private media: MediaMatcher) { }

  public ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');

    const newFilter = this.createFilter();
    this.filter = new BehaviorSubject<FilterBase>(newFilter);

    this.search = this.route.queryParams.pipe(map((queryParams: Params) => queryParams['search'] || ''));
    this.listItemsSearch = this.route.queryParams.pipe(map((queryParams: Params) => queryParams['listsearch'] || ''));
    this.activeSchemaId = this.route.paramMap.pipe(map((params) => params.get('schemaId') || ''));
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public setUpActiveSchema(schema: Schema) {
    this.updateRoute(schema.id!, this.queryParams);
  }

  public closeList() {
    this.activeSchema.next(null);
    const queryParams = this.queryParams;
    if (queryParams['filter']) {
      delete queryParams['filter'];
    }

    if (queryParams['listsearch']) {
      delete queryParams['listsearch'];
    }

    this.updateRoute('', queryParams);
  }

  public changeListItemSearchQuery(query: string) {
    if (query || query === '') {
      const queryParams = this.queryParams;

      if (query) {
        queryParams['listsearch'] = query;
      } else {
        delete queryParams['listsearch'];
      }

      this.router.navigate([], { queryParams });
    }
  }

  public closeParent() {
    this.activeParentSchema.next(null);
  }

  private updateRoute(schemaId: string, queryParams: Params) {
    this.router.navigate(['/list-items', schemaId], { queryParams });
  }

  private createFilter() {
    const filter = new AndFilter({ filters: [] });

    filter.filters!.push(new TermsFilter({ terms: ['List'], field: 'types' }));
    filter.filters!.push(new NotFilter({ filter: new ExistsFilter({ field: 'parentSchemaId' }) }));

    return filter;
  }
}
