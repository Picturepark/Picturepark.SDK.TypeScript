import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';

// LIBRARIES
import { Schema, FilterBase, AndFilter, TermsFilter, NotFilter, ExistsFilter } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-list-item-picker',
  templateUrl: './list-item-picker.component.html',
  styleUrls: ['./list-item-picker.component.scss']
})
export class ListItemPickerComponent implements OnInit {

  public activeParentSchema = new Subject<Schema>();
  public search = new Subject<string>();
  public filter = new Subject<FilterBase>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public setUpActiveSchema(schema: Schema): void {
    this.updateRoute(schema.id!, this.queryParams);
  }

  private updateRoute(schemaId: string, queryParams: Params): void {
    this.router.navigate(['/list-items', schemaId], { queryParams });
  }

  private createFilter() {
    const filter = new AndFilter({ filters: [] });

    filter.filters!.push(new TermsFilter({ terms: ['List'], field: 'types' }));
    filter.filters!.push(new NotFilter({ filter: new ExistsFilter({ field: 'parentSchemaId' }) }));

    return filter;
  }

  ngOnInit() {
    const newFilter = this.createFilter();
    this.activeParentSchema.next();
    this.filter = new BehaviorSubject<FilterBase>(newFilter);
    this.search.next('anton');
  }

}

