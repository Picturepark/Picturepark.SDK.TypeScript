# pp-list-item-aggregation-list

A control to select filters for the list items. 

```
<pp-list-item-aggregation-list 
 [schemaId]="schemaId"
 [aggregators]="aggregations"
 [aggregationFilters]="aggregationFilters"
 (aggregationFiltersChange)="changeAggregationFilters($event)"
 [query]="query"
 (filterChange)="filterChange($event)">
 </pp-list-item-aggregation-list>
```

Properties: 

- **schemaId:** The id of the selected schema
- **query:** The search query ([pp-search-box](pp-search-box.md)) specify the list items for which the filters should be loaded. 
- **aggregators:** The aggregations to show the available filters and grouped results.
- **aggregationFilters:** The filters aggregations.
- **aggregationFiltersChange:** Event emitted when the aggregations filters have changed.
- **filterChange:** Event emitted when the filter has changed.