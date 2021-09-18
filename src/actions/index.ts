export const storeSearchTerm = (setSearchTerm: any) => ({
  type: 'SEARCH_TERM_SET',
  payload: setSearchTerm,
})

export const storeSetCategory = (setCategory: string) => ({
  type: 'SET_CATEGORY',
  payload: setCategory,
})

export const storeOverviewQuery = (setQuery: string) => ({
  type: 'SET_OVERVIEW_QUERY',
  payload: setQuery,
})

export const storeBaseLoaded = (setBaseLoad: string) => ({
  type: 'SET_BASE_LOADED',
  payload: setBaseLoad,
})
