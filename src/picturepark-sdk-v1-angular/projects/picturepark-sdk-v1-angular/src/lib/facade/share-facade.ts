import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShareDetail, ShareService } from '../services/api-services';

@Injectable({
  providedIn: 'root',
})
export class ShareFacade {
  constructor(private shareService: ShareService) {}

  loadNextPageOfContents(shareDetail: ShareDetail, shareToken: string, language: string, limit: number, url?: string) {
    return this.shareService.getShareContents(shareToken, language, limit, shareDetail.pageToken).pipe(
      tap((contents) => {
        shareDetail.pageToken = contents.pageToken;
        shareDetail.contentSelections = [...shareDetail.contentSelections, ...contents.results];
      })
    );
  }
}
