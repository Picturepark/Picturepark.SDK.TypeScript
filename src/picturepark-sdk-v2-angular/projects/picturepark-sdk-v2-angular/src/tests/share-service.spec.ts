import {} from 'jasmine';
import { inject, waitForAsync } from '@angular/core/testing';

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
import { lastValueFrom } from 'rxjs';

describe('ShareService', () => {
  beforeEach(configureTest);

  it('should create embed share', waitForAsync(
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

        const response = await lastValueFrom(contentService.search(request));

        // act
        const contents = response?.results.map(
          i =>
            new ShareContent({
              contentId: i.id,
              outputFormatIds: ['Original'],
            })
        );

        const result = await lastValueFrom(
          shareService.create(
            new ShareBasicCreateRequest({
              name: 'Share',
              languageCode: 'en',
              contents: contents ?? [],
              outputAccess: OutputAccess.Full,
              suppressNotifications: false,
            })
          )
        );

        await lastValueFrom(businessProcessService.waitForCompletion(result?.id ?? '', '02:00:00', true));
        const share = await lastValueFrom(shareService.get(result?.referenceId ?? '', null, 20));

        // assert
        expect(result?.referenceId).not.toBeNull();
        expect(share?.id).toEqual(result?.referenceId as string);
      }
    )
  ));
});
