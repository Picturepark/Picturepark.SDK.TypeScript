import { Component, EventEmitter, Inject, Output, ViewChild, ElementRef, Renderer2, AfterViewInit  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// MD5 HASH
import { Md5 } from 'ts-md5/dist/md5';

// LIBRARIES
import {
  ContentSearchRequest, ContentSearchType, ShareService, OutputAccess, ShareContent,
  ShareBasicCreateRequest, BrokenDependenciesFilter, LifeCycleFilter, IUserEmail,
  ShareDataBasic, BasicTemplate, ContentService, fetchAll, TermsFilter
} from '@picturepark/sdk-v1-angular';

// COMPONENTS
import { BaseComponent } from '../base.component';

// PIPES
import { TranslatePipe } from '../../shared-module/pipes/translate.pipe';

// INTERFACES
import { ConfirmRecipients } from './interfaces/confirm-recipients.interface';

@Component({
  selector: 'pp-share-content-dialog',
  templateUrl: './share-content-dialog.component.html',
  styleUrls: ['./share-content-dialog.component.scss', 'share-content-dialog-resp.component.scss'],
  providers: [ TranslatePipe ]
})
export class ShareContentDialogComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('shareContentContainer', { static: true }) shareContentContainer: ElementRef;
  @ViewChild('loaderContainer', { static: true }) loaderContainer: ElementRef;

  contentItemSelectionSubscription: Subscription;
  downloadThumbnailSubscription: Subscription;

  selectedContent: Array<string> = [];
  sharedContentForm: FormGroup;

  loader = false;

  notificationMessage = '';
  notificationStatus = false;
  notificationType = 'success';
  notificationDisplayTime = 10000;

  recipients: ConfirmRecipients[] = [];

  @Output()
  public previewItemChange = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contentService: ContentService,
    public dialogRef: MatDialogRef<ShareContentDialogComponent>,
    private formBuilder: FormBuilder,
    private shareService: ShareService,
    private translatePipe: TranslatePipe,
    private renderer: Renderer2
  ) {
    super();

    this.selectedContent = data;

    this.sharedContentForm = this.formBuilder.group({
      share_name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      recipients: this.formBuilder.array([], [ Validators.required ]),
      expire_date: new FormControl('')
    });

  }

  // CLOSE DIALOG WHEN PRESSING ON THE CROSS
  public closeDialog(): void {
    this.dialogRef.close();
  }

  // REMOVE CONTENT FROM DIALOG
  public removeContent(event: string): void {
    this.selectedContent.map((item, index) => {
      if (event === item) { this.selectedContent.splice(index, 1); }
    });
    // CLOSE DIALOG IF NOT SELECTED IMAGES
    if (this.selectedContent.length === 0) { this.closeDialog(); }
  }

  public previewItem(itemId: string): void {
    this.previewItemChange.emit(itemId);
  }

  // COPY URL TO CLIPBOARD
  public copyToClipboard(recipienturl: string): void {
    const copyBox = document.createElement('textarea');
        copyBox.value = recipienturl;
        document.body.appendChild(copyBox);
        document.execCommand('copy');
        document.body.removeChild(copyBox);
  }

  // CREATE NEW SHARED CONTENT
  async newSharedContent(contentItems: ShareContent[], recipientsEmails: IUserEmail[]): Promise<void> {
    try {

      const response = await this.shareService.create(new ShareBasicCreateRequest({
        name: this.sharedContentForm.get('share_name')!.value,
        recipientsEmail: recipientsEmails,
        contents: contentItems,
        outputAccess: OutputAccess.Full,
        languageCode: 'en',
        template: new BasicTemplate({ width: 366, height: 366 })
      })).toPromise();

      const share = await this.shareService.get(response.shareId!).toPromise();

      (share.data as ShareDataBasic).mailRecipients.map(recipient => this.recipients.push({
        email: recipient.userEmail.emailAddress,
        url: recipient.url!,
        img: `https://www.gravatar.com/avatar/${Md5.hashStr(recipient.userEmail.emailAddress)}?d=mm&s=48`
      }));

      // HIDE LOADER
      this.loader = false;

      setTimeout(() => {
        // SET NOTIFICATION PROPERTIES
        this.notificationMessage = `#${response.shareId} ${this.translatePipe.transform('ShareContentDialog.SuccessNotification')}`;
        this.notificationType = 'success';
        this.notificationStatus = true;
        this.notificationDisplayTime = 10000;
      }, 200);

    } catch (err) {

      // HIDE LOADER
      this.loader = false;

      setTimeout(() => {
        // SET ERROR NOTIFICATION PROPERTIES
        this.notificationMessage = err.exceptionMessage || this.translatePipe.transform('ShareContentDialog.ErrorNotification')!;
        this.notificationType = 'error';
        this.notificationStatus = true;
        this.notificationDisplayTime = 10000;
      }, 200);

    }

  }

  // SHARE CONTENT SUBMIT BUTTON ACTION
  public onFormSubmit(): void {

    if (this.sharedContentForm.valid) {

      this.loader = true;

      // CONTENT ITEMS
      const contentItems = this.selectedContent.map(item => new ShareContent({
        contentId: item,
        outputFormatIds: ['Original']
      }));

      // RECIPIENTS EMAILS
      const recipientsEmails = this.sharedContentForm.get('recipients')!.value.map(recipientEmail => {
       return { emailAddress: recipientEmail };
      });

      // CREATE NEW SHARE
      this.newSharedContent(contentItems, recipientsEmails);

    }
  }

  // SET PREFILL SUBJECT
  public setPrefillSubject(selectedContent: string[]): void {

    const contentSearch = fetchAll(req => this.contentService.search(req), new ContentSearchRequest({
      limit: 1,
      lifeCycleFilter: LifeCycleFilter.ActiveOnly,
      brokenDependenciesFilter: BrokenDependenciesFilter.All,
      searchType: ContentSearchType.MetadataAndFullText,
      debugMode: false,
      filter: new TermsFilter({
        field: 'id',
        terms: selectedContent
      })
    })).subscribe(data => {
      const subject = this.translatePipe.transform(
        'ShareContentDialog.ItemsMore', [data.results[0].displayValues.name, data.results.length - 1]
      );
      this.sharedContentForm.get('share_name')!.setValue(subject);
    });

    this.subscription.add(contentSearch);

  }

  ngAfterViewInit() {

    // PREFILL SUBJECT
    this.setPrefillSubject(this.selectedContent);

    // SET LOADER HEIGHT DYNAMIC
    const containerHeight = this.shareContentContainer.nativeElement.offsetHeight;
    this.renderer.setStyle(this.loaderContainer.nativeElement, 'height', `${containerHeight - 114}px`);

  }

}
