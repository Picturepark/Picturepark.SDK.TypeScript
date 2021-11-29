import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import {
  IContentDownloadRequestItem,
  ShareDetail,
  ShareDownloadRequest,
  ShareResolveBehavior,
} from '../services/api-services';
import { ShareAccesService } from '../services/frontend-services';
import { LiquidRenderingService } from '../services/liquid-rendering.service';

@Injectable({
  providedIn: 'root',
})
export class ShareAccessFacade {
  constructor(private shareAccessService: ShareAccesService, private liquidRenderingService: LiquidRenderingService) {}

  getShareByToken(
    token: string,
    lang: string | null | undefined,
    resolveBehaviors: ShareResolveBehavior[] | null | undefined,
    contentResolveLimit: number | null | undefined
  ) {
    return this.shareAccessService.getJson(token, lang, resolveBehaviors, contentResolveLimit).pipe(
      map(result => {
        this.liquidRenderingService.renderNestedDisplayValuesSync(result);
        return result;
      })
    );
  }

  loadNextPageOfContents(shareDetail: ShareDetail, shareToken: string, language: string, limit: number) {
    return this.shareAccessService.getContentsInShare(shareToken, language, limit, shareDetail.pageToken).pipe(
      tap(contents => {
        this.liquidRenderingService.renderNestedDisplayValuesSync(contents);
        shareDetail.pageToken = contents.pageToken;
        shareDetail.contentSelections = [...shareDetail.contentSelections, ...contents.results];
      })
    );
  }

  createShareSelectionDownloadLink(shareToken: string, contents: IContentDownloadRequestItem[]) {
    return this.shareAccessService.createShareSelectionDownloadLink(
      shareToken,
      new ShareDownloadRequest({ items: contents })
    );
  }

  getOutputsInShare(shareToken: string) {
    return this.shareAccessService.getOutputsInShare(shareToken);
  }
}
