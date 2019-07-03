import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, of, zip } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';

// ANGULAR CDK
import { ScrollDispatcher } from '@angular/cdk/overlay';

// LIBRARIES
import {
  InfoService,
  JsonSchemaService,
  ListItemCreateManyRequest,
  ListItemCreateRequest,
  ListItemUpdateItem,
  ListItemUpdateManyRequest,
} from '@picturepark/sdk-v1-angular';
import * as lodash from 'lodash';

// COMPONENTS
import {
  ImportPreviewStepComponent,
} from '../../../../infrastructure/components/import/import-preview-step/import-preview-step.component';

// SERVICES
import {
    ImportUpdateService,
} from '../../../../infrastructure/components/import/import-update-step/import-update-step.service';
import {
    ImportValidationReportService,
} from '../../../../infrastructure/components/import/import-validation-report/import-validation-report.service';
import { BatchService } from '../../../../infrastructure/components/import/services/batch.service';
import { MetaDataPreviewService } from '../../../../infrastructure/components/import/services/metadata-preview.service';
import { ProgressBarService } from '../../../../infrastructure/services/progress-bar.service';
import { ListItemsImportDataService } from '../list-items-import-data.service';
import { ImportPreviewStepService } from './list-items-import-preview-step.service';
import { ListItemsImportService } from './list-items-import.service';

@Component({
  selector: 'app-import-preview-step',
  templateUrl: '../../../../infrastructure/components/import/import-preview-step/import-preview-step.component.html',
  styleUrls: ['../../../../infrastructure/components/import/import-preview-step/import-preview-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsImportPreviewStepComponent extends ImportPreviewStepComponent implements OnInit {
  public id: string;

  constructor(private batchService: BatchService,
    private importUpdateService: ImportUpdateService,
    private importDataService: ListItemsImportDataService,
    private jsonSchemaService: JsonSchemaService,
    private metaDataPreviewService: MetaDataPreviewService,
    private previewStepService: ImportPreviewStepService,
    private listItemsImportService: ListItemsImportService,
    private infoService: InfoService,
    protected cdr: ChangeDetectorRef,
    protected scrollDispatcher: ScrollDispatcher,
    protected progressBarService: ProgressBarService,
    protected importValidationReportService: ImportValidationReportService) {
    super(scrollDispatcher, progressBarService, importValidationReportService, cdr);
  }

  ngOnInit() {
    super.ngOnInit();

    const batchSubscription = combineLatest(
      this.importDataService.mappedData,
      this.importDataService.columnsDef,
      this.infoService.getInfo(),
      this.importDataService.schema)
      .pipe(
        filter(([schema]) => schema !== null),
        flatMap(([mappedData, columnsDef, info, schema]) => {
          return zip(of(mappedData), of(columnsDef), of(info), of(schema),
            !!schema ? this.jsonSchemaService.get(schema.id) : of(schema));
        }))
      .subscribe(([mappedData, columnsDef, info, schema, jsonSchema]) => {
        if (schema) {
          this.id = schema.id;
          this.batchImportData = this.previewStepService.validateMappedData(mappedData);
          this.batchService.validateRecords(this.batchImportData, jsonSchema);
          this.tableData = this.metaDataPreviewService.getListItemsTableData(this.batchImportData, schema, info, false);
          this.displayedColumns = this.metaDataPreviewService.prepareTableColumns(columnsDef, this.tableData);
          this.tableItems = this.tableData.slice(0, this.rangeSize);
          this.dataSource = new MatTableDataSource(this.tableItems);
          this.dataSource.sort = this.sort;
        }

        this.progressBarService.hide();
        this.cdr.detectChanges();
      });

    this.subscription.add(batchSubscription);
  }

  private getUpdateManyRequest(recordsToUpdate: any[]): ListItemUpdateManyRequest {
    if (recordsToUpdate.length > 0) {
      const updateManyRequest: ListItemUpdateManyRequest = new ListItemUpdateManyRequest({
        allowMissingDependencies: true,
        items: []
      });

      recordsToUpdate.forEach((record: any) => {
        // clone for keeping id property
        const newRecord = lodash.cloneDeep(record);

        const id = newRecord.id;
        delete newRecord.id;
        const rec: ListItemUpdateItem = new ListItemUpdateItem({
          content: this.batchService.sanitizeContentRecord(newRecord),
          id: id
        });
        updateManyRequest.items.push(rec);
      });
      return updateManyRequest;
    }

    return null;
  }

  private getCreateManyRequest(recordsToCreate: any[]): ListItemCreateManyRequest {
    if (recordsToCreate.length > 0) {
      const createManyRequest: ListItemCreateManyRequest = new ListItemCreateManyRequest({
        allowMissingDependencies: true,
        items: []
      });

      recordsToCreate.forEach((record: any) => {
        const rec: ListItemCreateRequest = new ListItemCreateRequest({
          contentSchemaId: this.id,
          content: this.batchService.sanitizeContentRecord(record)
        });
        createManyRequest.items.push(rec);
      });
      return createManyRequest;
    }

    return null;
  }

  public importRecords() {
    this.progressBarService.show();

    const recordsToCreate = this.batchImportData.filter(x => !x.id);
    const createMany = this.getCreateManyRequest(recordsToCreate);

    const recordsToUpdate = this.batchImportData.filter(x => x.id);
    const updateMany = this.getUpdateManyRequest(recordsToUpdate);

    this.importUpdateService.importResult = this.listItemsImportService.importListItems(createMany, updateMany);
    this.stepper.next();
  }
}