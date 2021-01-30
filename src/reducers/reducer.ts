export interface AppState {
  searchTerm: string
  category: string
}

export const initialState: AppState = {
  searchTerm: '',
  category: ''
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
        default:
            return state;
    }
}

export default rootReducer