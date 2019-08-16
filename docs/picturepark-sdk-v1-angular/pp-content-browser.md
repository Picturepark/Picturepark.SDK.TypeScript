# pp-content-browser

Renders a list of content items for the given channel, filters and search string.

```
<pp-content-browser selectionMode="single" 
                    [channel]="selectedChannel" 
                    [filters]="filters" 
                    [searchString]="searchText"
                    (totalResultsChange)="totalResultsChange($event)"
                    (selectedItemsChange)="selectedItemsChange($event)"
                    columns="3">
</pp-content-browser>
```

Properties:

- **height (required):** The height of the content browser element
- **selectionMode:** Defines the selection mode. Supported values: 'none', 'single', 'multiple' (default: 'multiple')
- **channel:** The selected channel (may be select in the [pp-channel-picker](pp-channel-picker.md) component)
- **searchString:** The search searchString (may be entered in the [pp-search-box](pp-search-box.md) component)
- **filters:** The selected filters (may be choosen in the [pp-aggregation-filter](pp-aggregation-filter.md) component)
- **columns (default: 2):** The number of columns to render
- **totalResultsChange:** Event emitted when the amount of content items has changed.
- **selectedItemsChange:** Event emitted when the array of the selected items has changed.

CSS Classes:

- picturepark-content-browser
- picturepark-content-browser-item
- picturepark-content-browser-item-selected
- picturepark-content-browser-item-thumbnail
