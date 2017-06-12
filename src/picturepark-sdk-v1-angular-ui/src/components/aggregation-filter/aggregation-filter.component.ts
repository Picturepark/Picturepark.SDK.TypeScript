import { Component, Input, OnChanges, SimpleChange, LOCALE_ID, Inject, Output, EventEmitter } from '@angular/core';
import { InputConverter, StringConverter } from '../converter';

import { 
  ContentService, 
  ObjectAggregationResult, 
  ContentAggregationRequest,
  AggregationFilter, 
  FilterBase, 
  AggregationResult, 
  AggregationResultItem, 
  OrFilter } from '@picturepark/sdk-v1-angular';

@Component({
  selector: 'pp-aggregation-filter',
  templateUrl: './aggregation-filter.component.html'
})
export class AggregationFilterComponent implements OnChanges {
  isLoading = true;
  
  aggregations: AggregationResult[] = [];
  @Output()
  aggregationsChange = new EventEmitter<AggregationResult[]>();

  @Input()
  @InputConverter(StringConverter)
  channel: string = '';

  @Input()
  query = '';

  @Input()
  filters: FilterBase[] | null = null; 
  @Output()
  filtersChange = new EventEmitter<AggregationFilter[]>();

  aggregationFilters: AggregationFilter[]; 

  constructor(private contentService: ContentService, @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['channel'] || changes['query'] || changes['filters']) {
      this.refresh();
    }
  }

  async refresh() {
    if (this.channel) {
      this.isLoading = true;
      try {
        let request = new ContentAggregationRequest({
          searchString: this.query, 
          aggregationFilters: this.aggregationFilters, 
          lifeCycleFilter: 0
        });

        let result = await this.contentService.aggregateByChannel(this.channel, request).toPromise();
        if (result && result.aggregationResults) {
          this.aggregations = result.aggregationResults.filter(r => 
            r.sumOtherDocCount !== null && 
            r.aggregationResultItems && 
            r.aggregationResultItems.length > 0);
        }
        else
          this.aggregations = []; 

        this.isLoading = false;
      } catch (error) {
        this.aggregations = [];
        this.isLoading = false;
      }

      this.aggregationsChange.emit(this.aggregations);
    }
  }

  selectionChanged(changedItem: AggregationResultItem) {
    changedItem.active = !changedItem.active;    
    
    let filters: FilterBase[] = [];
    let aggregationFilters: AggregationFilter[] = [];
    if (this.aggregations) {
      for (let result of this.aggregations) {
        let resultFilters: FilterBase[] = [];

        if (result.aggregationResultItems) {
          for (let item of result.aggregationResultItems) {
            if (item.active && item.filter) {
              aggregationFilters.push(item.filter);
              resultFilters.push(item.filter.filter!);
            }
          }
        }

        if (resultFilters.length > 0){
          let orFilter = new OrFilter();
          orFilter.filters = resultFilters;
          filters.push(orFilter);
        }
      }
    }
    
    this.aggregationFilters = aggregationFilters; 

    this.filters = filters; 
    this.filtersChange.emit(filters);
  }
}