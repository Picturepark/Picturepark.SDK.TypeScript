import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import {
  ContentService, ContentAggregationOnChannelRequest, AggregationFilter, AggregationResult,
  ContentSearchType, BrokenDependenciesFilter, LifeCycleFilter, Channel, AggregatorBase, FilterBase, OrFilter, AndFilter
} from '../../services/services';


@Component({
  selector: 'pp-aggregation-filter',
  templateUrl: './aggregation-filter.component.html',
  styleUrls: ['./aggregation-filter.component.scss'],
})
// TODO: add basic aggregation component, add inheritance.
export class AggregationFilterComponent implements OnChanges {
  // TODO: aggregationFilters as input.
  @Input()
  public channel: Channel;

  @Input()
  public query = '';

  // Filter used for search. E.g.: Nested filter,And filter,Or filter.
  @Output()
  public filterChange = new EventEmitter<FilterBase | null>();

  // Aggregation filters used for Aggregation function.
  public aggregationFiltersFlat: AggregationFilter[] = [];

  // Aggregation filters connected to aggregators by index.
  private aggregationFilters: Array<AggregationFilter[]> = [];

  public isLoading = true;

  public aggregators: AggregatorBase[] = [];

  public aggregationResults: AggregationResult[] = [];

  constructor(private contentService: ContentService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['channel'] && this.channel) {
      this.aggregators = this.channel.aggregations || [];
      this.aggregationResults = []
      this.aggregationFilters = [];
      this.aggregationFiltersFlat = [];
      this.filterChange.emit(null);
    }

    if (changes['channel'] || changes['query']) {
      this.fetchData();
    }
  }

  public clearFilters(): void {
    // TODO: implement this.
  }

  public aggregationFiltersChanged(aggregatorIndex: number, aggregationFilters: AggregationFilter[]): void {
    this.aggregationFilters[aggregatorIndex] = aggregationFilters;

    // flatten array and remove undefined.
    this.aggregationFiltersFlat = ([] as AggregationFilter[]).concat(...this.aggregationFilters).filter(item => item);
    const filter = this.getFilter(this.aggregationFilters);
    this.filterChange.emit(filter);

    this.fetchData();
  }

  private getFilter(aggregationFilters: Array<AggregationFilter[]>): FilterBase | null {
    const preparedFilters = aggregationFilters
      .map(array => {
        const filtered = array.filter(aggregationFilter => aggregationFilter.filter)
          .map(aggregationFilter => aggregationFilter.filter as FilterBase);

        switch (filtered.length) {
          case 0: return null;
          case 1: return filtered[0];
          default: return new OrFilter({ filters: filtered });
        }
      })
      .filter(filter => filter !== null);

    switch (preparedFilters.length) {
      case 0: return null;
      case 1: return preparedFilters[0];
      default: return new AndFilter({ filters: preparedFilters as FilterBase[] })
    }
  }

  private fetchData() {
    if (this.channel) {
      this.isLoading = true;
      const request = new ContentAggregationOnChannelRequest({
        channelId: this.channel.id,
        searchString: this.query,
        brokenDependenciesFilter: BrokenDependenciesFilter.All,
        aggregationFilters: this.aggregationFiltersFlat,
        searchType: ContentSearchType.MetadataAndFullText,
        lifeCycleFilter: LifeCycleFilter.ActiveOnly
      });

      this.contentService.aggregateOnChannel(request).subscribe(result => {
        this.processAggregationResults(result.aggregationResults || []);
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    }
  }

  private processAggregationResults(aggregationResults: AggregationResult[]) {
    this.aggregationResults = [];

    aggregationResults.forEach(aggregationResult => {
      const aggregatorIndex = this.aggregators.findIndex(aggregator => aggregator.name === aggregationResult.name);

      if (aggregatorIndex > -1) {
        this.aggregationResults[aggregatorIndex] = aggregationResult;
      }
    });
  }
}
