import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { bufferCount, concatAll, map, mergeMap, tap } from 'rxjs/operators';
import { ContentResolveBehavior, ContentService, ShareDetail, ShareService } from '../services/api-services';

@Injectable({
  providedIn: 'root',
})
export class ShareFacade {
  constructor(private shareService: ShareService, private contentService: ContentService) {}

  loadNextPageOfContents(shareDetail: ShareDetail, shareToken: string, language: string, limit: number, url?: string) {
    return this.shareService.getShareContents(shareToken, language, limit, shareDetail.pageToken).pipe(
      tap((contents) => {
        shareDetail.pageToken = contents.pageToken;
        shareDetail.contentSelections = [...shareDetail.contentSelections, ...contents.results];
      })
    );
  }

  getContentRights(contentIds: string[]) {
    return from(contentIds).pipe(
      bufferCount(100),
      mergeMap((contentIdsChunk) =>
        this.contentService.getMany(contentIdsChunk, [ContentResolveBehavior.Permissions]).pipe(
          map((response) => response.map((cupr) => cupr.contentRights)),
          concatAll()
        )
      )
    );
  }
}
