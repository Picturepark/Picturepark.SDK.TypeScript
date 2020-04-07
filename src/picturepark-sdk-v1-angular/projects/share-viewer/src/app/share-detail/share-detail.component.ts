import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ShareDetail, IMailRecipient, InfoFacade, ShareDataBasic, ShareContentDetail, ShareService } from '@picturepark/sdk-v1-angular';
import { ContentDetailsDialogComponent, ContentDetailDialogOptions } from '@picturepark/sdk-v1-angular-ui';

@Component({
  selector: 'app-share-detail',
  templateUrl: './share-detail.component.html',
  styleUrls: ['./share-detail.component.scss']
})
export class ShareDetailComponent implements OnInit {
  public shareDetail: ShareDetail;
  public mailRecipients: IMailRecipient[];
  public logoUrl: string;
  public isLoading = false;
  public items: ShareContentDetail[] = [];

  public shareDetailJsonTest = '{ "id": "142ede027b634d37aeecb53d7fa63313", "name": "1.png ", "description": "", "creator": { "displayName": "cp-support120 Support", "emailHash": "d66c7a8722b7523b46e3da5c052dabfa" }, "audit": { "creationDate": "2020-03-27T16:57:31.549Z", "modificationDate": "2020-03-27T16:57:31.882Z", "createdByUser": "9e9cdc2612134e778f533c11107ba993", "modifiedByUser": "9e9cdc2612134e778f533c11107ba993" }, "contentSelections": [ { "contentSchemaId": "ImageMetadata", "layerSchemaIds": [ "XmpMetadata" ], "content": { "kind": "ImageMetadata", "width": 425, "height": 282, "widthInInch": 2.951540470123291, "heightInInch": 1.958433985710144, "widthInCm": 7.496912956237793, "heightInCm": 4.974422454833984, "colorSpace": "Rgb", "bitsPerPixel": 32, "bitsPerChannel": 8, "channels": "Argb", "pixelFormat": "Format32bppArgb", "hasAlpha": true, "isIndexed": false, "isExtended": false, "horizontalResolution": 143.9925994873047, "verticalResolution": 143.9925994873047, "totalFrames": 0, "totalUnspecifiedTiffExtraChannels": 0, "hasExifData": false, "hasIptcData": false, "hasAdobeResourceData": false, "hasXmpData": false, "uncompressedSizeInBytes": 479400, "fileExtension": ".png", "fileName": "1.png", "filePath": "", "fileSizeInBytes": 240061, "sha1Hash": "52365EDB91BE9829B6A196D9AF356D9A957B9E41" }, "metadata": {}, "id": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputs": [ { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "Original", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/Original", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/Original", "detail": { "width": 425, "height": 282, "kind": "OutputDataImage", "fileExtension": ".png", "filePath": "Original\\e01b71a78ccf41a0aac7dd4d2776b33b.1.png", "fileSizeInBytes": 240061, "sha1Hash": "52365EDB91BE9829B6A196D9AF356D9A957B9E41", "originalFileName": "1.png" }, "dynamicRendering": false }, { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "Preview", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/Preview", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/Preview", "detail": { "width": 425, "height": 282, "kind": "OutputDataImage", "fileExtension": ".jpg", "filePath": "Preview\\e01b71a78ccf41a0aac7dd4d2776b33b.1.jpg", "fileSizeInBytes": 72004, "sha1Hash": "7351C993F922080A707E15079F33D47E04841C81", "originalFileName": "1.jpg" }, "dynamicRendering": false }, { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "DynamicHighResImage", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/DynamicHighResImage", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/DynamicHighResImage", "detail": { "width": 0, "height": 0, "kind": "OutputDataImage", "fileExtension": ".jpg", "filePath": "DynamicHighResImage\\e01b71a78ccf41a0aac7dd4d2776b33b-b3fa7e5b-ed0f-4ec3-b07e-b90515858011.jpg", "fileSizeInBytes": null, "sha1Hash": null, "originalFileName": "1.jpg" }, "dynamicRendering": true }, { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "ThumbnailLarge", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailLarge", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailLarge", "detail": { "width": 320, "height": 212, "kind": "OutputDataImage", "fileExtension": ".jpg", "filePath": "ThumbnailLarge\\e01b71a78ccf41a0aac7dd4d2776b33b.1.jpg", "fileSizeInBytes": 40476, "sha1Hash": "A38450B96BAE982D5A927474E7197B7712D36420", "originalFileName": "1.jpg" }, "dynamicRendering": false }, { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "ThumbnailMedium", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailMedium", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailMedium", "detail": { "width": 220, "height": 146, "kind": "OutputDataImage", "fileExtension": ".jpg", "filePath": "ThumbnailMedium\\e01b71a78ccf41a0aac7dd4d2776b33b.1.jpg", "fileSizeInBytes": 20585, "sha1Hash": "BDB24E7954E9CFA8B6C7A2491585820C361AF62F", "originalFileName": "1.jpg" }, "dynamicRendering": false }, { "kind": "ShareOutputBasic", "contentId": "e01b71a78ccf41a0aac7dd4d2776b33b", "outputFormatId": "ThumbnailSmall", "viewUrl": "http://santest-cdn.01.qa-picturepark.com/v/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailSmall", "downloadUrl": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b/ThumbnailSmall", "detail": { "width": 120, "height": 80, "kind": "OutputDataImage", "fileExtension": ".jpg", "filePath": "ThumbnailSmall\\e01b71a78ccf41a0aac7dd4d2776b33b.1.jpg", "fileSizeInBytes": 7175, "sha1Hash": "EADF8DB0945E15E6CF877B2444243D85609FB4E9", "originalFileName": "1.jpg" }, "dynamicRendering": false } ], "contentType": "Bitmap", "displayValues": { "thumbnail": "Owner", "name": "1.png", "detail": "1.png<br><br>234.43 KB | 425 x 282 px | Colorspace: Rgb | DPI: 143.9925994873047 | Creation date: 09-Mar-2020 15:08:04 | Modification date: 26-Mar-2020 09:47:09", "list": "234.43 KB | 425 x 282 px | Colorspace: Rgb | DPI: 143.9925994873047<br>Creation date: 09-Mar-2020 15:08:04 | Modification date: 26-Mar-2020 09:47:09" }, "iconUrl": "http://santest-cdn.01.qa-picturepark.com/icon/yWz74MNB/e01b71a78ccf41a0aac7dd4d2776b33b" } ], "layerSchemaIds": [], "data": { "mailRecipients": [], "internalRecipients": [ { "recipient": { "id": "9e9cdc2612134e778f533c11107ba993", "firstName": "cp-support120", "lastName": "Support", "emailAddress": "cp-support120@picturepark.com", "isDeleted": false }, "token": "yWz74MNB", "url": "http://santest-cdn.01.qa-picturepark.com/s/yWz74MNB" } ], "languageCode": "en", "kind": "ShareDataBasic", "url": "http://santest-cdn.01.qa-picturepark.com/d/yWz74MNB" }, "expired": false, "outputAccess": "Full", "shareType": "Basic" }';
   

  constructor(
    private shareService: ShareService,
    private infoFacade: InfoFacade,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(PICTUREPARK_CONFIGURATION)
    private pictureparkConfiguration: PictureparkAccessTokenAuthConfiguration
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const shareToken = paramMap.get('token')!;
      this.update(shareToken);
    });
  }

  update(searchString: string): void {
    if (!searchString) {
      return;
    }

    this.infoService.getInfo().subscribe(customerInfo => {
      this.logoUrl = customerInfo.logosUrl + 'name';
    });
    
    this.isLoading = true;

    const shareInfo = forkJoin([
      this.shareService.getShareJson(searchString, null),
      this.infoFacade.getInfo()
    ]);

    shareInfo.subscribe({
      next: ([shareJson, info]) => {
        if (info.logosUrl) {
          this.logoUrl = info.logosUrl + 'name';
        }
        if (shareJson) {
          this.shareDetail = ShareDetail.fromJS(shareJson);
          this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients;
        }
        this.isLoading = false;
      }
    });
  }

  downloadAll(): void {
    window.location.replace(this.shareDetail.data!.url);
  }

  showDetail(item: ShareContentDetail): void {
    let index = this.shareDetail.contentSelections.indexOf(item);
    this.dialog.open(ContentDetailsDialogComponent,
      {
        data: <ContentDetailDialogOptions>{
          id: item.id,
          shareContent: item,
          shareDetail: this.shareDetail,
          showMetadata: false,
          hasPrevious: () => {
            return index !== 0;
          },
          hasNext: () => {
            return this.shareDetail.contentSelections.length > index + 1;
          },
          previous: () => {
            index--;
            return this.shareDetail.contentSelections[index];
          },
          next: () => {
            index++;
            return this.shareDetail.contentSelections[index];
          }
        },
        autoFocus: false,
        width: '980px',
        height: '700px',
        maxWidth: '98vw',
        maxHeight: '99vh'
      }
    );
  }

}
