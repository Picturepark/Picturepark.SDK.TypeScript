import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AndFilter,
  ExistsFilter,
  FilterBase,
  NotFilter,
  Schema,
  SchemaSearchFacade,
  SchemaService,
  TermsFilter,
} from '@picturepark/sdk-v1-angular';
import { BaseComponent } from '@picturepark/sdk-v1-angular-ui';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-items-picker',
  templateUrl: './list-items-picker.component.html',
  styleUrls: ['./list-items-picker.component.scss'],
})
export class ListItemsPickerComponent extends BaseComponent implements OnInit {
  public parentSchemaId$: Observable<string>;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private schemaService: SchemaService,
    private facade: SchemaSearchFacade
  ) {
    super(injector);
  }

  public ngOnInit(): void {
    this.facade.searchRequestState.baseFilter = this.createFilter();
    this.parentSchemaId$ = this.route.queryParamMap.pipe(map((params) => params.get('parentSchemaId') || ''));

    // Load on page navigation and initial load
    this.sub = this.parentSchemaId$
      .pipe(
        distinctUntilChanged(),
        mergeMap((i) => (i ? this.schemaService.get(i) : of(null))),
        tap((i) => {
          if (i) {
            (i as any).childCount = i.descendantSchemaIds?.length ?? 0;
          }
        })
      )
      .subscribe((i) => {
        this.facade.patchRequestState({
          baseFilter: this.createFilter(),
          parentSchema: i ? Schema.fromJS(i) : undefined,
        });
      });
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public get request() {
    return this.facade.searchRequestState;
  }

  public setUpActiveSchema(schema: Schema): void {
    this.updateRoute([schema.id]);
  }

  public setParent(schema: Schema) {
    this.updateRoute(['/list-item-picker'], { ...this.queryParams, parentSchemaId: schema.id });
  }

  private updateRoute(commands: any[], queryParams?: Params): void {
    this.router.navigate(commands, { relativeTo: this.route, queryParams: queryParams });
  }

  private createFilter(): FilterBase {
    const listFilter = new AndFilter({
      filters: [new TermsFilter({ terms: ['List'], field: 'types' })],
    });

    if (!this.queryParams.parentSchemaId) {
      listFilter.filters?.push(new NotFilter({ filter: new ExistsFilter({ field: 'parentSchemaId' }) }));
    }

    return listFilter;
  }
}
