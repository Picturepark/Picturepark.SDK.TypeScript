import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subscription, zip } from 'rxjs';
import { flatMap, take } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// LIBRARIES
import {
  FieldMultiTagbox,
  FieldSingleFieldset,
  FieldSingleTagbox,
  FilterBase,
  SchemaDetail,
} from '@picturepark/sdk-v1-angular';
import * as moment from 'moment';

// COMPONENTS
import { ExportBaseComponent } from '../../../shared-module/components/export/export-base.component';
import ReferencedData from '../../../shared-module/components/export/reference-data';

// SERVICES
import { ExportService } from '../../../shared-module/services/export/export.service';
import { ListItemsExportService } from './services/list-items-export.service';
import { ProgressBarService } from '../../../shared-module/services/progress-bar/progress-bar.service';
import { TranslationService } from '../../../shared-module/services/translations/translation.service';

// INTERFACES
import FieldHelper from '../../../shared-module/components/field-helper';

@Component({
  selector: 'pp-export',
  templateUrl: '../../../infrastructure/components/export/export-base.component.html'
})
export class ListItemsExportComponent extends ExportBaseComponent implements OnInit, OnDestroy {

  public isExporting: Observable<boolean>;
  public filter: FilterBase;
  public searchString: string;
  public schemaId: string;
  public selectedItems: string[];

  private subscription = new Subscription();

  protected get fileName(): string {
    return `${this.schemaId}_${moment().format('DD_MMM_YYYY_hh_mm_a')}.xlsx`;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      filter: Observable<FilterBase>,
      searchString: Observable<string>,
      schema: Observable<SchemaDetail>,
      selectedItems: string[]
    },
    private listItemsExportService: ListItemsExportService,
    private exportService: ExportService,
    public translationService: TranslationService,
    public dialogRef: MatDialogRef<ListItemsExportComponent>,
    private progressBarService: ProgressBarService,
  ) {
    super(translationService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.isExporting = this.progressBarService.isVisible;
    this.isSelectAllActive = true;
    this.selectedItems = this.data.selectedItems;

    // tslint:disable-next-line: deprecation
    combineLatest(this.data.filter, this.data.schema, this.data.searchString)
      .pipe(flatMap(([filter, schema, searchString]: [FilterBase, SchemaDetail, string]) => {

        // get referenced schemas for tag box fields (need it to extract data correctly)
        const schemaIds = new Set<string>();
        schema.fields!.filter(f => FieldHelper.isReferencedField(f))
          .forEach((tg: (FieldSingleFieldset | FieldMultiTagbox | FieldSingleTagbox)) =>
            schemaIds.add(tg.schemaId));

        const ids = Array.from(schemaIds);

        const referencedData = ids.length > 0 ? this.exportService.getReferencedData(
          of(new ReferencedData(ids, []))) : of(new ReferencedData([], [])
        );

        return zip(of(filter), of(schema), referencedData, of(searchString));
      }),
        take(1))
      .subscribe(([filter, schema, referencedData, searchString]: [FilterBase, SchemaDetail, ReferencedData, string]) => {

        this.itemsNodes = this.prepareItemsNodes(schema, referencedData.schemaDetails);

        this.dataSource.data = this.itemsNodes;
        this.schemaId = schema.id;
        this.filter = filter;
        this.searchString = searchString;
      });
  }

  public export() {
    this.progressBarService.show();

    const schemaFields = this.getSelectedSchemaFields();

    // generate xls on the backend
    const exportSubscription = this.listItemsExportService.exportListItems(this.schemaId,
      schemaFields,
      this.filter,
      this.searchString,
      this.selectedItems)
      .pipe(take(1),
      )
      .subscribe((data: any) => {
        this.downloadFile(data);
        this.progressBarService.hide();
        this.dialogRef.close(true);
      }, () => {
        this.progressBarService.hide();
      });

    this.subscription.add(exportSubscription);
  }

  public cancel() {
    this.progressBarService.hide();
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
