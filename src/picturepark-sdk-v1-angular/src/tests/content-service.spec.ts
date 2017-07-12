import { } from 'jasmine';
import { async, inject } from '@angular/core/testing';

import { PICTUREPARK_API_URL, PictureparkModule, AuthService, 
  ContentService, ContentSearchRequest, ThumbnailSize, ContentAggregationRequest } from '../index';
import { testUrl, testUsername, testPassword, configureTest } from './config';

describe('ContentService', () => {
  beforeEach(configureTest);

  it('should return search results', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentSearchRequest();
    request.searchString = 'm';

    let response = await contentService.search(request).toPromise();

    // assert
    expect(response!.totalResults).toBeGreaterThan(0);
  })));

  it('should download content thumbnail', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentSearchRequest();
    request.searchString = 'm';
    
    let response = await contentService.search(request).toPromise();
    let result = await contentService.downloadThumbnail(response!.results![0].id!, ThumbnailSize.Medium, false).toPromise();

    // assert
    expect(result.data.size).toBeGreaterThan(0);
  })));

  it('should download resized content', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentSearchRequest();
    request.searchString = 'm';
    
    let response = await contentService.search(request).toPromise();
    let result = await contentService.downloadResized(response!.results![0].id!, "Original", 100, 100).toPromise();

    // assert
    expect(result!.data.size).toBeGreaterThan(0);
  })));

  it('should download content', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentSearchRequest();
    request.searchString = 'm';
    
    let response = await contentService.search(request).toPromise();
    let result = await contentService.download(response!.results![0].id!, 'Original', 'bytes=500-999').toPromise();

    // assert
    expect(result!.data.size).toBeGreaterThan(0);
  })));

  it('should return some aggregations', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentAggregationRequest();
    request.searchString = 'm';

    let response = await contentService.aggregate(request).toPromise();

    // assert
    expect(response!.aggregationResults!.length).toBeGreaterThan(0);
  })));

  it('should return some aggregations for RootChannel', async(inject([AuthService, ContentService], 
    async (authService: AuthService, contentService: ContentService) => {
    // arrange
    await authService.login(testUsername, testPassword);

    // act
    let request = new ContentAggregationRequest();
    request.searchString = 'm';

    let response = await contentService.aggregateByChannel("RootChannel", request).toPromise();

    // assert
    expect(response!.aggregationResults!.length).toBeGreaterThan(0);
  })));
});