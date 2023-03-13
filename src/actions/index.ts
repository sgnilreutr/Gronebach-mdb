export const storeSearchTerm = (setSearchTerm: string | undefined) => ({
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
