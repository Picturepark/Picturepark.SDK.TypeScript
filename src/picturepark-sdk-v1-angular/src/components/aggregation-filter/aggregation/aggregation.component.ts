import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges, LOCALE_ID, Inject } from '@angular/core';

import {
  AggregationFilter, AggregationResult, AggregatorBase, AggregationResultItem, TermsAggregator
} from '../../../services/services';


@Component({
  selector: 'pp-aggregation',
  templateUrl: './aggregation.component.html'
})
export class AggregationComponent implements OnChanges {
  @Input()
  aggregator: AggregatorBase;

  @Input()
  aggregationResult: AggregationResult | null = null;

  @Input()
  aggregationFilters: AggregationFilter[] = [];

  @Output()
  aggregationFiltersChange: EventEmitter<AggregationFilter[]> = new EventEmitter();

  public expandedAggregator: TermsAggregator;

  public expandedAggregationResult: AggregationResult | null = null;

  public constructor(@Inject(LOCALE_ID) public locale: string) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['aggregator']) {
      this.expandedAggregator = this.expandAggregator(this.aggregator);
    }

    if (changes['aggregationResult']) {
      this.expandedAggregationResult = this.aggregationResult ? this.expandAggregationResult(this.aggregationResult) : null;
    }
  }

  public selectionChanged(changedItem: AggregationResultItem): void {
    changedItem.active = !changedItem.active;

    const filters = this.expandedAggregationResult!.aggregationResultItems ?
      this.expandedAggregationResult!.aggregationResultItems!
        .filter(agr => agr.active === true && agr.filter)
        .map(agr => agr.filter as AggregationFilter) : [];

    this.aggregationFiltersChange.emit(filters);
  }

  private expandAggregator(aggregator: AggregatorBase): TermsAggregator {
    // TODO, verify this magic is valid.
    if (aggregator.aggregators && aggregator.aggregators.length > 0) {
      return this.expandAggregator(aggregator.aggregators[0]);
    }

    return aggregator;
  }

  private expandAggregationResult(aggregationResult: AggregationResult): AggregationResult {
    // TODO: Verify that this is correct;
    if (
      aggregationResult &&
      aggregationResult.aggregationResultItems &&
      aggregationResult.aggregationResultItems[0] &&
      aggregationResult.aggregationResultItems[0].aggregationResults &&
      aggregationResult.aggregationResultItems[0].aggregationResults![0]) {
      return this.expandAggregationResult(aggregationResult.aggregationResultItems[0].aggregationResults![0])
    }

    return aggregationResult;
  }
}
