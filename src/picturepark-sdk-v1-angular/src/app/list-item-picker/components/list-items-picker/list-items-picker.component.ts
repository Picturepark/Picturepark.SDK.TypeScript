import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';

// LIBRARIES
import {
  Schema,
  FilterBase,
  AndFilter,
  TermsFilter,
  NotFilter,
  ExistsFilter,
  SchemaSearchFacade,
} from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-list-items-picker',
  templateUrl: './list-items-picker.component.html',
  styleUrls: ['./list-items-picker.component.scss'],
})
export class ListItemsPickerComponent {
  public activeParentSchema = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute, private facade: SchemaSearchFacade, private router: Router) {
    facade.searchRequestState.baseFilter = this.createFilter();
  }

  public get queryParams(): Params {
    return Object.assign({}, this.route.snapshot.queryParams);
  }

  public setUpActiveSchema(schema: Schema): void {
    this.updateRoute(schema.id);
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
