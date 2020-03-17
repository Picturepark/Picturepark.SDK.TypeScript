import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, tap } from 'rxjs/operators';
import { forkJoin, Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { ShareDetail,
  IMailRecipient,
  InfoService,
  ShareDataBasic,
  ShareContentDetail,
  ShareService,
  LiquidRenderingService,
  PICTUREPARK_API_URL
} from '@picturepark/sdk-v1-angular';
import { ContentDetailsDialogComponent, ContentDetailDialogOptions } from '@picturepark/sdk-v1-angular-ui';
import { HttpHeaders, HttpResponseBase, HttpClient } from '@angular/common/http';
import { lang } from 'moment';

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

  constructor(
    private shareService: ShareService,
    private infoService: InfoService,
    private liquidRenderingService: LiquidRenderingService,
    private dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
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

    this.isLoading = true;

    // 5jXghkKK  /json/5jXghkKK

    const shareInfo = forkJoin({
      shareDetail: this.shareService.getShareJson(searchString, null),
      customerInfo: this.infoService.getInfo()
    });

    shareInfo.subscribe({
      next: ([shareJson, info]) => {
        this.logoUrl = info.logosUrl + 'name';
        this.shareDetail = ShareDetail.fromJS(shareJson);
        this.mailRecipients = (this.shareDetail.data as ShareDataBasic).mailRecipients;
        this.isLoading = false;
      }
    });

    debugger;

    this.shareService.getShareJson(searchString, null, 'https://santest.01.qa-picturepark.com').subscribe( result => {
      debugger;
    })

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


  // /**
  //    * Get share json
  //    * @param token Share token
  //    * @param lang (optional) Language code
  //    * @return ShareDetail
  //    */
  // getShareJsonCoreFromUrl(token: string, lang: string | null | undefined, url: string): Observable<any> {
  //   let url_ = this.baseUrl + url;
  //   if (token === undefined || token === null) {
  //       throw new Error('The parameter \'token\' must be defined.');
  //   }
  //   url_ = url_.replace('{token}', encodeURIComponent('' + token));
  //   if (lang !== undefined) {
  //       url_ += 'lang=' + encodeURIComponent('' + lang) + '&';
  //   }
  //   url_ = url_.replace(/[?&]$/, '');

  //   const options_: any = {
  //       observe: 'response',
  //       responseType: 'blob',
  //       headers: new HttpHeaders({
  //           'Accept': 'application/json'
  //       })
  //   };

  //   return _observableFrom(this.share transformOptions(options_)).pipe(_observableMergeMap(transformedOptions_ => {
  //       return this.http.request('get', url_, transformedOptions_);
  //   })).pipe(_observableMergeMap((response_: any) => {
  //       return this.processGetShareJson(response_);
  //   })).pipe(_observableCatch((response_: any) => {
  //       if (response_ instanceof HttpResponseBase) {
  //           try {
  //               return this.processGetShareJson(<any>response_);
  //           } catch (e) {
  //               return <Observable<any>><any>_observableThrow(e);
  //           }
  //       } else {
  //           return <Observable<any>><any>_observableThrow(response_);
  //       }
  //   }));
  // }
}
