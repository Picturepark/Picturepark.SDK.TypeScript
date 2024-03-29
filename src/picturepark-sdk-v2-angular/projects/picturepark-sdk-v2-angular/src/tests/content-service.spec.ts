import {} from 'jasmine';
import { inject, waitForAsync } from '@angular/core/testing';

import { configureTest } from './config';
import {
  ContentService,
  ContentSearchRequest,
  SearchBehavior,
  ThumbnailSize,
  TermFilter,
  ContentAggregationRequest,
  TermsAggregator,
} from '../lib/services/api-services';
import { lastValueFrom, take } from 'rxjs';

describe('ContentService', () => {
  beforeEach(configureTest);

  it('should return search results', waitForAsync(
    inject([ContentService], async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];

      const response = await lastValueFrom(contentService.search(request).pipe(take(1)));

      // assert
      expect(response?.totalResults).toBeGreaterThan(0);
    })
  ));

  it('should download content thumbnail', waitForAsync(
    inject([ContentService], async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];

      const response = await lastValueFrom(contentService.search(request).pipe(take(1)));
      const result = await lastValueFrom(
        contentService.downloadThumbnail(response?.results[0].id ?? '', ThumbnailSize.Medium, null, null).pipe(take(1))
      );

      // assert
      expect(result?.data.size).toBeGreaterThan(0);
    })
  ));

  it('should download resized content', waitForAsync(
    inject([ContentService], async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];
      request.filter = new TermFilter({
        field: 'contentType',
        term: 'Bitmap',
      });

      const response = await lastValueFrom(contentService.search(request).pipe(take(1)));
      const result = await lastValueFrom(
        contentService.download(response?.results[0].id ?? '', 'Original', 100, 100, null).pipe(take(1))
      );

      // assert
      expect(result?.data.size).toBeGreaterThan(0);
    })
  ));

  it('should download content', waitForAsync(
    inject([ContentService], async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentSearchRequest();
      request.searchString = 'm';
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];

      const response = await lastValueFrom(contentService.search(request).pipe(take(1)));
      if (!response?.results?.[0]?.id) return;

      const result = await lastValueFrom(
        contentService.download(response.results[0].id, 'Original', null, null, 'bytes=500-999').pipe(take(1))
      );

      // assert
      expect(result?.data.size).toBeGreaterThan(0);
    })
  ));

  // it('should throw exception when not found', async(inject([ContentService],
  //   async (contentService: ContentService) => {
  //     // arrange
  //     const contentId = 'foo.bar';

  //     // act
  //     try {
  //       const response = await contentService.get(contentId, true, null).toPromise();
  //     } catch (e) {
  //       // assert
  //       expect(e instanceof ContentNotFoundException).toBeTruthy();
  //       expect(e.contentId).toBe('foo.bar');
  //       return;
  //     }
  //     fail();
  //   })));

  it('should return some aggregations', waitForAsync(
    inject([ContentService], async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentAggregationRequest();
      request.searchString = 'm';
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];
      request.aggregators = [
        new TermsAggregator({
          field: 'fileMetadata.fileSize',
          name: 'fileSize',
          size: 10,
        }),
      ];

      const response = await lastValueFrom(contentService.aggregate(request).pipe(take(1)));

      // assert
      expect(response?.aggregationResults.length).toBeGreaterThan(0);
    })
  ));

  /*
  it('should return some aggregations for RootChannel', async(inject([ContentService],
    async (contentService: ContentService) => {
      // arrange

      // act
      const request = new ContentAggregationOnChannelRequest();
      request.searchString = 'm';
      request.channelId = 'RootChannel';
      request.searchBehaviors = [SearchBehavior.WildcardOnSingleTerm];

      const response = await contentService.aggregateOnChannel(request).toPromise();

      // assert
      expect(response!.aggregationResults!.length).toBeGreaterThan(0);
    })));
    */
});
