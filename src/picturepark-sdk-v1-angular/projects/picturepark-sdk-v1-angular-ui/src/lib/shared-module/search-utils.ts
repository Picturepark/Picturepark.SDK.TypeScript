/**
 * Since the api search behavior value for advanced search is "null",
 * there is the need to create a enumerator value corresponding to the AdvancedSearch
 */
export enum ExtendedSearchBehavior {
  DropInvalidCharactersOnFailure = 'DropInvalidCharactersOnFailure',
  WildcardOnSingleTerm = 'WildcardOnSingleTerm',
  SimplifiedSearch = 'SimplifiedSearch',
  WildcardOnEveryTerm = 'WildcardOnEveryTerm',
  SimplifiedSearchOr = 'SimplifiedSearchOr',
  AdvancedSearch = 'AdvancedSearch',
}

export interface SearchParameters {
  searchString: string;
  searchBehavior: ExtendedSearchBehavior;
}
