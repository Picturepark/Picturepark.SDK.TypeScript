import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// LIBRARIES
import { AggregatorBase, AggregationFilter, SchemaDetail, FilterBase } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'app-list-item-picker',
  templateUrl: './list-item-picker.component.html',
  styleUrls: ['./list-item-picker.component.css']
})
export class ListItemPickerComponent implements OnInit {

  @Input() activeSchema: Subject<SchemaDetail>;
  public mobileQuery: MediaQueryList;
  public aggregationFilters: AggregationFilter[] = [];
  public isImportActive: Subject<boolean> = new Subject<boolean>();
  public searchQuery: Observable<string>;
  public filter: Subject<FilterBase> = new Subject<FilterBase>();
  public aggregations: AggregatorBase[];
  public schemaDetail: SchemaDetail;
  public schema: Observable<SchemaDetail>;
  public refreshAll: Observable<boolean>;
  public deselectAll: Subject<void> = new Subject<void>();;
  public schemaId: string;
  public isImportAllowed: Observable<boolean>;
  public selectedItems: string[];

  constructor() { }

  public selectedItemsChange(selectedItems: string[]) {
    this.selectedItems = selectedItems;
  }

  ngOnInit() {}

}
