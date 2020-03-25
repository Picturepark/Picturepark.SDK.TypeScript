import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';

// LIBRARIES
import { Schema, FilterBase, AndFilter, TermsFilter, NotFilter, ExistsFilter } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-list-items-picker',
  templateUrl: './list-items-picker.component.html',
  styleUrls: ['./list-items-picker.component.scss'],
})
export class ListItemsPickerComponent {

  // [TEMPLATE CLEANSING] Deleted because the activeParentSchema variable is never used
  public activeParentSchema = new BehaviorSubject(null);
  public search = new BehaviorSubject<string>('');
  // [TEMPLATE CLEANSING] Deleted because the search variable is never used
  public filter: BehaviorSubject<FilterBase>;

  constructor(private route: ActivatedRoute, private router: Router) {
    const newFilter = this.createFilter();
    this.filter = new BehaviorSubject(newFilter);
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public setUpActiveSchema(schema: Schema): void {
    this.updateRoute(schema.id!);
  }

  private updateRoute(schemaId: string): void {
    this.router.navigate([schemaId], { relativeTo: this.route });
  }

  private createFilter(): FilterBase {
    const filter = new AndFilter({
      filters: [
        new TermsFilter({ terms: ['List'], field: 'types' }),
        new NotFilter({ filter: new ExistsFilter({ field: 'parentSchemaId' }) }),
      ],
    });

    return filter;
  }
}
