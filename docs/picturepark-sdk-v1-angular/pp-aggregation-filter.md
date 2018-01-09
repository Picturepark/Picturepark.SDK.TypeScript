# pp-channel-picker

**NPM Package:** @picturepark/sdk-v1-angular-ui

A control to select filters for the content items in the given channel and search text. 

```
<pp-aggregation-filter [channel]="selectedChannel" 
                       [query]="searchText" 
                       [(filters)]="filters">
</pp-aggregation-filter>
```

Properties: 

- **label:** The label of the component
- **channel:** 
- **query:** The channel ([pp-channel-picker](pp-channel-picker.md)) and search query ([pp-search-box](p-search-bo.md)) specify the content items for which the filters should be loaded. 
- **filters (two-way):** The selected filters (can be used as input for the [pp-content-browser](pp-content-browser.md) component)
- **aggregations:** The available aggregations