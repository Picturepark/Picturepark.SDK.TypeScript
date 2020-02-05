

export enum ExtendedSearchBehavior {
    DropInvalidCharactersOnFailure = 'DropInvalidCharactersOnFailure',
    WildcardOnSingleTerm = 'WildcardOnSingleTerm',
    SimplifiedSearch = 'SimplifiedSearch',
    WildcardOnEveryTerm = 'WildcardOnEveryTerm',
    SimplifiedSearchOr = 'SimplifiedSearchOr',
    AdvancedSearch =  'AdvancedSearch',
}

export interface SearchParameters {
    searchString: string;
    searchBehavior: ExtendedSearchBehavior;
}
