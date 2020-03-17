import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { configureTest } from './config';
import { ContentService, ShareService, ContentSearchRequest, ShareContent, ShareBasicCreateRequest, OutputAccess } from '../lib/api-services';

describe('ShareService', () => {
  beforeEach(configureTest);

  // [TODO] reenable this test
  // it('should create embed share', async(inject([ContentService, ShareService],
  //   async (contentService: ContentService, shareService: ShareService) => {
  //     // arrange
  //     const request = new ContentSearchRequest();
  //     request.searchString = 'm';

  //     const response = await contentService.search(request).toPromise();

  //     // act
  //     const contents = response.results.map(i => new ShareContent({
  //       contentId: i.id,
  //       outputFormatIds: ['Original']
  //     }));

  //     const result = await shareService.create( null, new ShareBasicCreateRequest({
  //       name: 'Share',
  //       languageCode: 'en',
  //       contents: contents,
  //       outputAccess: OutputAccess.Full,
  //       suppressNotifications: false
  //     })).toPromise();

  //     const share = await shareService.get(result.shareId!).toPromise();

  //     // assert
  //     expect(result.shareId).not.toBeNull();
  //     expect(share.id).toEqual(result.shareId!);
  //   })));
});
