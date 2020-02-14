

export enum ExtendedSearchBehavior {
    DropInvalidCharactersOnFailure = 'DropInvalidCharactersOnFailure',
    WildcardOnSingleTerm = 'WildcardOnSingleTerm',
    SimplifiedSearch = 'SimplifiedSearch',
    WildcardOnEveryTerm = 'WildcardOnEveryTerm',
    SimplifiedSearchOr = 'SimplifiedSearchOr',
    AdvancedSearch =  'AdvancedSearch',
    CPSimplifiedSearch = 'simplified',
    CPSimplifiedSearchOr = 'simplifiedOr',
    CPAdvancedSearch =  'advanced'
}

export interface SearchParameters {
    searchString: string;
    searchBehavior: ExtendedSearchBehavior;
}
