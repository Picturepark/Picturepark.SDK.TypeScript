import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_URL, PictureparkModule, AuthService, 
  ContentService, ContentSearchRequest,
  ShareContent, ShareBasicCreateRequest, ShareService } from '../index';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('ShareService', () => {
  beforeEach(configureTest);

  it('should create embed share', async(inject([AuthService, ContentService, ShareService], 
    async (authService: AuthService, contentService: ContentService, shareService: ShareService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentSearchRequest();
    request.searchString = 'm';
    
    let response = await contentService.search(request).toPromise();
    let contents = response!.results!.map(i => new ShareContent({ 
      contentId: i.id, 
      outputFormatIds: ["Original"] 
    }));

    let result = await shareService.create(new ShareBasicCreateRequest({
      contents: contents
    })).toPromise();

    let share = await shareService.get(result!.shareId!).toPromise();

    // assert
    expect(result!.shareId).not.toBeNull();
    expect(share!.id).toEqual(result!.shareId);
  })));
});