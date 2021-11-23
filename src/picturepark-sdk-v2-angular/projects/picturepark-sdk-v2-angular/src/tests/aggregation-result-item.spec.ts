import { configureTest } from './config';
import { AggregationResultItem, AggregationFilter } from '../lib/services/api-services';

describe('AggregationResultItem', () => {
  let aggregationResultItem: AggregationResultItem;

  beforeAll(() => {
    aggregationResultItem = new AggregationResultItem();
  });

  beforeEach(configureTest);

  describe('getDisplayName', () => {
    describe('if aggregationName is ownerTokenId', () => {
      beforeAll(() => {
        aggregationResultItem.filter = new AggregationFilter();
        aggregationResultItem.filter.aggregationName = 'ownerTokenId';
      });

      it('should get part after slash', () => {
        // arrange
        const name = 'part after slash';
        aggregationResultItem.name = `first part/${name}`;

        // act
        const result = aggregationResultItem.getDisplayName('en');

        // assert
        expect(result).toBe(name);
      });

      it('should get whole name', () => {
        // arrange
        const name = 'name without slash';
        aggregationResultItem.name = name;

        // act
        const result = aggregationResultItem.getDisplayName('en');

        // assert
        expect(result).toBe(name);
      });
    });
  });
});
