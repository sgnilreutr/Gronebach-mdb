export const storeSearchTerm = (setSearchTerm: string ) => {
    return {
        type: 'SEARCH_TERM_SET',
        payload: setSearchTerm
    }
};

export const storeSetCategory = (setCategory: string) => {
    return {
        type: 'SET_CATEGORY',
        payload: setCategory
    }
}

export const storeOverviewQuery = (setQuery: string) => {
    return {
        type: 'SET_OVERVIEW_QUERY',
        payload: setQuery
    }
}

export const storeBaseLoaded = (setBaseLoad: string) => {
    return {
        type: 'SET_BASE_LOADED',
        payload: setBaseLoad
    }
}