import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ContentResolveBehavior, ContentService, ShareDetail, ShareService } from '../services/api-services';
import { flatArray } from '../utilities/array-functions';
import { createArrayOfObservablesByChunks } from '../utilities/observable-functions';

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
    const getPermissionsObservables = createArrayOfObservablesByChunks(contentIds, 100, (chunk) =>
      this.contentService.getMany(chunk, [ContentResolveBehavior.Permissions])
    );

    return forkJoin(getPermissionsObservables).pipe(
      map((response) => flatArray(response).map((cupr) => cupr.contentRights)),
      map(flatArray),
      map((x) => Array.from(new Set(x)))
    );
  }
}
