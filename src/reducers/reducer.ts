export interface AppState {
  searchTerm: string
    category: string
    overviewQuery: string
    baseLoaded: boolean
}

export const initialState: AppState = {
  searchTerm: '',
  category: '',
  overviewQuery: '',
  baseLoaded: false
}

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SEARCH_TERM_SET':
            return {
                ...state,
                searchTerm: action.payload
            }
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload
            }
        case 'SET_OVERVIEW_QUERY':
            return {
                ...state,
                overviewQuery: action.payload
            }
        case 'SET_BASE_LOADED':
            return {
                ...state,
                baseLoaded: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer