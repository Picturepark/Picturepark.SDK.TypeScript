import {} from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { configureTest } from './config';
import {
  ContentService,
  ShareService,
  ContentSearchRequest,
  ShareContent,
  ShareBasicCreateRequest,
  OutputAccess,
  BusinessProcessService,
} from '../lib/services/api-services';

describe('ShareService', () => {
  beforeEach(configureTest);

  it('should create embed share', async(
    inject(
      [ContentService, ShareService, BusinessProcessService],
      async (
        contentService: ContentService,
        shareService: ShareService,
        businessProcessService: BusinessProcessService
      ) => {
        // arrange
        const request = new ContentSearchRequest();
        request.searchString = 'm';

        const response = await contentService.search(request).toPromise();

        // act
        const contents = response.results.map(
          (i) =>
            new ShareContent({
              contentId: i.id,
              outputFormatIds: ['Original'],
            })
        );

        const result = await shareService
          .create(
            new ShareBasicCreateRequest({
              name: 'Share',
              languageCode: 'en',
              contents: contents,
              outputAccess: OutputAccess.Full,
              suppressNotifications: false,
            })
          )
          .toPromise();

        await businessProcessService.waitForCompletion(result.id, '02:00:00', true).toPromise();
        const share = await shareService.get(result.referenceId!).toPromise();

        // assert
        expect(result.referenceId).not.toBeNull();
        expect(share.id).toEqual(result.referenceId!);
      }
    )
  ));
});
