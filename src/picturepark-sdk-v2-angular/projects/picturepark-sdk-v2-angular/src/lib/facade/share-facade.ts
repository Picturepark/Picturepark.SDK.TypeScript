import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentResolveBehavior, ContentService } from '../services/api-services';
import { flatArray } from '../utilities/array-functions';
import { createArrayOfObservablesByChunks } from '../utilities/observable-functions';

@Injectable({
  providedIn: 'root',
})
export class ShareFacade {
  constructor(private contentService: ContentService) {}

  getContentRights(contentIds: string[]) {
    const getPermissionsObservables = createArrayOfObservablesByChunks(contentIds, 100, chunk =>
      this.contentService.getMany(chunk, [ContentResolveBehavior.Permissions])
    );

    return forkJoin(getPermissionsObservables).pipe(
      map(response => flatArray(response).map(cupr => cupr.contentRights)),
      map(flatArray),
      map(x => Array.from(new Set(x)))
    );
  }
}
