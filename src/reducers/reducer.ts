export interface AppState {
  searchTerm: string
    category: string
    overviewQuery: string
}

export const initialState: AppState = {
  searchTerm: '',
  category: '',
  overviewQuery: ''
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
        default:
            return state;
    }
}

export default rootReducer