import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import {
  PICTUREPARK_API_URL, ContentService, ContentSearchRequest,
  ThumbnailSize, ContentAggregationRequest, PictureparkApplicationException,
  ContentNotFoundException
} from '../picturepark.services';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('ContentService', () => {
  beforeEach(configureTest);

  it('should return search results', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';

      const response = await contentService.search(request).toPromise();

      // assert
      expect(response!.totalResults).toBeGreaterThan(0);
    })));

  it('should download content thumbnail', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';

      const response = await contentService.search(request).toPromise();
      const result = await contentService.downloadThumbnail(response!.results![0].id!, ThumbnailSize.Medium, false).toPromise();

      // assert
      expect(result!.data.size).toBeGreaterThan(0);
    })));

  it('should download resized content', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';

      const response = await contentService.search(request).toPromise();
      const result = await contentService.download(response!.results![0].id!, 'Original', 100, 100, null).toPromise();

      // assert
      expect(result!.data.size).toBeGreaterThan(0);
    })));

  it('should download content', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';

      const response = await contentService.search(request).toPromise();
      const result = await contentService.download(response!.results![0].id!, 'Original', null, null, 'bytes=500-999').toPromise();

      // assert
      expect(result!.data.size).toBeGreaterThan(0);
    })));

  it('should throw exception when not found', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange
      const contentId = 'foo.bar';

      // act
      try {
        const response = await contentService.get(contentId, true, null).toPromise();
      } catch (e) {
        // assert
        // expect(e instanceof ContentNotFoundException).toBeTruthy(); // TODO: Fix this unit test
        expect(e.contentId).toBe('foo.bar');
        return;
      }
      fail();
    })));

  it('should return some aggregations', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentAggregationRequest();
      request.searchString = 'm';

      const response = await contentService.aggregate(request).toPromise();

      // assert
      expect(response!.aggregationResults!.length).toBeGreaterThan(0);
    })));

  it('should return some aggregations for RootChannel', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentAggregationRequest();
      request.searchString = 'm';

      const response = await contentService.aggregateByChannel('RootChannel', request).toPromise();

      // assert
      expect(response!.aggregationResults!.length).toBeGreaterThan(0);
    })));
});
