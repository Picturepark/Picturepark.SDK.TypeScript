import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import {
  ContentService, ContentSearchRequest,
  ShareContent, ShareBasicCreateRequest, ShareService, OutputAccess
} from '../services/services';
import { configureTest } from './config';

describe('ShareService', () => {
  beforeEach(configureTest);

  it('should create embed share', async(inject([ContentService, ShareService],
    async (contentService: ContentService, shareService: ShareService) => {
      // arrange
      const request = new ContentSearchRequest();
      request.searchString = 'm';

      const response = await contentService.search(request).toPromise();

      // act
      const contents = response!.results!.map(i => new ShareContent({
        contentId: i.id,
        outputFormatIds: ['Original']
      }));

      const result = await shareService.create(new ShareBasicCreateRequest({
        contents: contents,
        outputAccess: OutputAccess.Full
      })).toPromise();

      const share = await shareService.get(result!.shareId!).toPromise();

      // assert
      expect(result!.shareId).not.toBeNull();
      expect(share!.id).toEqual(result!.shareId);
    })));
});
