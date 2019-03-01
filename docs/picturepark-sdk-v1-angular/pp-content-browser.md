# pp-content-browser

Renders a list of content items for the given channel, filters and search query.

```
<pp-content-browser selectionMode="single" 
                    [channel]="selectedChannel" 
                    [filters]="filters" 
                    [query]="searchText"
                    [(selectedItems)]="selectedItems" 
                    [activateImport]="true"
                    [activateExport]="true"
                    (importChange)="import()"
                    (exportChange)="export()"
                    columns="3">
</pp-content-browser>
```

Properties:

- **height (required):** The height of the content browser element
- **selectionMode:** Defines the selection mode. Supported values: 'none', 'single', 'multiple' (default: 'multiple')
- **channel:** The selected channel (may be select in the [pp-channel-picker](pp-channel-picker.md) component)
- **query:** The search query (may be entered in the [pp-search-box](pp-search-box.md) component)
- **filters:** The selected filters (may be choosen in the [pp-aggregation-filter](pp-aggregation-filter.md) component)
- **columns (default: 2):** The number of columns to render
- **selectedItems (two-way):** An array of the selected items
- **activateImport (default:false):** Activate the import button
- **importChange EventEmitter<void>:** Event emitted when the import button has been clicked.
- **activateExport (default:false):** Activate the export button
- **exportChange EventEmitter<void>:** Event emitted when the export button has been clicked.

CSS Classes:

- picturepark-content-browser
- picturepark-content-browser-item
- picturepark-content-browser-item-selected
- picturepark-content-browser-item-thumbnail
