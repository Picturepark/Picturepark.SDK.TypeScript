import { Injectable } from '@angular/core';
import {
  ContentDownloadLinkCreateRequest,
  IContentDownloadRequestItem,
  ContentService,
  BusinessProcessService,
  BusinessProcessLifeCycleNotHitException,
} from '../services/api-services';
import { throwError } from 'rxjs';
import { mergeMap, retryWhen, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DownloadFacade {
  constructor(private contentService: ContentService, private businessProcessService: BusinessProcessService) {}

  getDownloadLink(contents: IContentDownloadRequestItem[]) {
    const request = new ContentDownloadLinkCreateRequest({
      contents: contents,
      notifyProgress: false,
    });

    return this.contentService.createDownloadLink(request).pipe(
      mergeMap(businessProcess => {
        return this.businessProcessService.waitForCompletion(businessProcess.id, undefined, false).pipe(
          mergeMap(() => {
            if (!businessProcess.referenceId) {
              return throwError('Business process did not return a referenceId');
            }
            return this.contentService.getDownloadLink(businessProcess.referenceId);
          }),
          retryWhen(errors =>
            errors.pipe(
              tap(error => {
                if (!(error instanceof BusinessProcessLifeCycleNotHitException)) {
                  throw error;
                }
              })
            )
          )
        );
      })
    );
  }
}
