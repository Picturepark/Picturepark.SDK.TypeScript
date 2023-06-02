import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  UntypedFormArray,
  ReactiveFormsModule,
} from '@angular/forms';

// MD5 HASH
import { Md5 } from 'ts-md5';

// LIBRARIES
import {
  ContentSearchRequest,
  ContentSearchType,
  ShareService,
  OutputAccess,
  ShareContent,
  ShareBasicCreateRequest,
  BrokenDependenciesFilter,
  LifeCycleFilter,
  IUserEmail,
  ShareDataBasic,
  ContentService,
  TermsFilter,
  Content,
  BusinessProcessService,
  LanguageService,
  ShareFacade,
  ContentRight,
} from '@picturepark/sdk-v2-angular';

// COMPONENTS
import { DialogBaseComponent } from '../../shared-module/components/dialog-base/dialog-base.component';

// INTERFACES
import { ConfirmRecipients } from './interfaces/confirm-recipients.interface';

// PIPES
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { ShareContentDialogItemComponent } from './components/share-content-dialog-item/share-content-dialog-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ShareContentRecipientsInputComponent } from './components/share-content-recipients-input/share-content-recipients-input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationComponent } from '../notification/components/notification/notification.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pp-share-content-dialog',
  templateUrl: './share-content-dialog.component.html',
  styleUrls: [
    '../../shared-module/components/dialog-base/dialog-base.component.scss',
    './share-content-dialog.component.scss',
  ],
  providers: [TranslatePipe],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    NotificationComponent,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ShareContentRecipientsInputComponent,
    DatePickerComponent,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    ShareContentDialogItemComponent,
    MatButtonModule,
    TranslatePipe,
  ],
})
export class ShareContentDialogComponent extends DialogBaseComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('contentContainer') contentContainer: ElementRef;
  @ViewChild('loaderContainer') loaderContainer: ElementRef;

  @Output() previewItemChange = new EventEmitter<string>();

  selectedContent: Content[] = [];
  sharedContentForm$ = new BehaviorSubject<UntypedFormGroup | undefined>(undefined);
  loader = false;
  spinnerLoader = true;
  recipients: ConfirmRecipients[] = [];
  languageFormControl: UntypedFormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contentService: ContentService,
    protected dialogRef: MatDialogRef<ShareContentDialogComponent>,
    private formBuilder: UntypedFormBuilder,
    private shareService: ShareService,
    private translatePipe: TranslatePipe,
    private renderer: Renderer2,
    private businessProcessService: BusinessProcessService,
    public languageService: LanguageService,
    private shareFacade: ShareFacade
  ) {
    super(dialogRef);
  }

  removeContent(event: Content) {
    this.selectedContent.forEach((item, index) => {
      if (event.id === item.id) {
        this.selectedContent.splice(index, 1);
      }
    });

    // CLOSE DIALOG IF NOT SELECTED IMAGES
    if (this.selectedContent.length === 0) {
      this.closeDialog();
    } else {
      this.setPrefillSubject(this.selectedContent);
    }
  }

  previewItem(itemId: string) {
    this.previewItemChange.emit(itemId);
  }

  copyToClipboard(recipienturl: string) {
    const copyBox = document.createElement('textarea');
    copyBox.value = recipienturl;
    document.body.appendChild(copyBox);
    document.execCommand('copy');
    document.body.removeChild(copyBox);
  }

  // CREATE NEW SHARED CONTENT
  private async newSharedContent(contentItems: ShareContent[], recipientsEmails: IUserEmail[]) {
    try {
      const form = this.sharedContentForm$.value;
      if (!form) {
        return;
      }
      const expDate = new Date(form.get('expire_date')?.value);
      const response = await firstValueFrom(
        this.shareService.create(
          new ShareBasicCreateRequest({
            name: form.get('share_name')?.value,
            recipientEmails: recipientsEmails,
            contents: contentItems,
            outputAccess: form.get('accessOriginal')?.value ? OutputAccess.Full : OutputAccess.Preview,
            languageCode: form.get('language')?.value ?? this.languageService.currentLanguage.ietf,
            suppressNotifications: false,
            expirationDate: isNaN(expDate.getTime()) ? undefined : expDate,
          })
        )
      );

      await firstValueFrom(this.businessProcessService.waitForCompletion(response.id, '02:00:00', true));

      const share = await firstValueFrom(this.shareService.get(response.referenceId ?? null, null, 0));

      (share.data as ShareDataBasic).internalRecipients.forEach(recipient =>
        this.recipients.push({
          email: recipient.recipient.emailAddress,
          url: recipient.url ?? '',
          img: `https://www.gravatar.com/avatar/${Md5.hashStr(recipient.recipient.emailAddress)}?d=mm&s=48`,
        })
      );

      (share.data as ShareDataBasic).mailRecipients.forEach(recipient =>
        this.recipients.push({
          email: recipient.userEmail.emailAddress,
          url: recipient.url ?? '',
          img: `https://www.gravatar.com/avatar/${Md5.hashStr(recipient.userEmail.emailAddress)}?d=mm&s=48`,
        })
      );

      // SET LOADER HEIGHT DYNAMIC
      const containerHeight = this.contentContainer.nativeElement.offsetHeight;
      this.renderer.setStyle(this.loaderContainer.nativeElement, 'height', `${containerHeight}px`);

      this.loader = false;
    } catch (err) {
      this.loader = false;
      const error = {
        message: err.exceptionMessage || this.translatePipe.transform('ShareContentDialog.ErrorNotification'),
        type: 'error',
        status: true,
        displayTime: -1,
      };

      this.notificationService.sendNotification(error);
    }
  }

  // SHARE CONTENT SUBMIT BUTTON ACTION
  onFormSubmit() {
    this.notificationService.clearNotification();

    if (this.sharedContentForm$.value && this.sharedContentForm$.value.valid) {
      this.loader = true;

      // CONTENT ITEMS
      const contentItems = this.selectedContent.map(
        item =>
          new ShareContent({
            contentId: item.id,
            outputFormatIds: ['Original'],
          })
      );

      // RECIPIENTS EMAILS
      const recipientsEmails = this.sharedContentForm$.value.get('recipients')?.value.map(recipientEmail => {
        return { emailAddress: recipientEmail };
      });

      // CREATE NEW SHARE
      this.newSharedContent(contentItems, recipientsEmails);
    }
  }

  // SET PREFILL SUBJECT
  private setPrefillSubject(selectedContent: Content[]) {
    // REMOVE SHARE NAME FROM FIELD VALUE
    const form = this.sharedContentForm$.value;
    if (!form) {
      return;
    }

    form.get('share_name')?.setValue('');
    this.sharedContentForm$.next(form);

    // SHOW SHARE NAME LOADER
    this.spinnerLoader = true;

    this.sub = this.contentService
      .search(
        new ContentSearchRequest({
          limit: 1,
          lifeCycleFilter: LifeCycleFilter.ActiveOnly,
          brokenDependenciesFilter: BrokenDependenciesFilter.All,
          searchType: ContentSearchType.MetadataAndFullText,
          debugMode: false,
          filter: new TermsFilter({
            field: 'id',
            terms: selectedContent.map(i => i.id),
          }),
        })
      )
      .subscribe(data => {
        // GENERATE SHARE NAME
        const shareName =
          data.totalResults - 1 > 0
            ? this.translatePipe.transform('ShareContentDialog.ItemsMore', [
                data.results[0].displayValues.name,
                data.totalResults - 1,
              ])
            : data.results[0].displayValues.name;

        setTimeout(() => {
          // HIDE SHARE NAME LOADER
          this.spinnerLoader = false;

          // SET SHARE NAME FORM FIELD VALUE
          form.get('share_name')?.setValue(shareName);
          this.sharedContentForm$.next(form);
        }, 200);
      });
  }

  ngAfterViewInit() {
    this.notificationService.clearNotification();
    this.selectedContent = [...this.data];
    this.languageFormControl = new UntypedFormControl(
      this.languageService.shareLanguages.find(lang => lang.ietf === this.languageService.currentLanguage.ietf)?.ietf ??
        this.languageService.shareLanguages[0].ietf,
      [Validators.required]
    );

    this.sub = this.hasAccessOriginalRights().subscribe(accessOriginal => {
      this.sharedContentForm$.next(
        this.formBuilder.group({
          share_name: new UntypedFormControl('', [Validators.required]),
          recipientSearch: new UntypedFormControl(''),
          recipients: new UntypedFormArray([], [Validators.required]),
          expire_date: new UntypedFormControl(''),
          language: this.languageFormControl,
          accessOriginal: new UntypedFormControl({ value: accessOriginal, disabled: !accessOriginal }),
        })
      );
      this.setPrefillSubject(this.selectedContent);
    });
  }

  private hasAccessOriginalRights() {
    return this.shareFacade
      .getContentRights(this.selectedContent.map(c => c.id))
      .pipe(map(cr => cr?.some(i => i === ContentRight.AccessOriginal) ?? false));
  }
}
