export const LOADING = 'Aan het laden...'
export const NO_ITEMS = 'Geen items gevonden.'
export const COULD_NOT_LOAD = 'Content kon niet geladen worden. Probeer het later nog een keer.'
export const LINK_MISSING_TITLE = 'Controleer de ontbrekende titels'

export const MOVIE_CATEGORIES = [
  { name: 'Best beoordeeld', filter: 'top' },
  { name: 'Vol met actie', filter: 'action' },
  { name: 'Romantische items', filter: 'romance' },
  { name: "Comedy's", filter: 'comedy' },
  { name: 'Ontdek de mysteries', filter: 'mystery' },
  { name: 'Misdaad', filter: 'crime' },
  { name: 'Kijk met de kinderen', filter: 'kids' },
] as const

export const ALL_CATEGORY_VALUE = 'all' as const

export type MovieCategoryOptions = (typeof MOVIE_CATEGORIES)[number]['filter'] | typeof ALL_CATEGORY_VALUE

export const GENERIC_LOADING_STATES = {
  idle: 'idle',
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
} as const

export type GenericLoadingState = (typeof GENERIC_LOADING_STATES)[keyof typeof GENERIC_LOADING_STATES]
