export const storeSearchTerm = (setSearchTerm: any ) => {
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