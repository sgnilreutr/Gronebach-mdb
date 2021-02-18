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

export interface Action {
 type: string
}

export interface SearchTermAction extends Action {
    payload: string
}

export interface CategoryAction extends Action {
    payload: string
}
export interface OverviewQueryAction extends Action {
    payload: string
}
export interface BaseLoadedAction extends Action {
    payload: boolean
}

function isSearchTermAction(action: Action): action is SearchTermAction {
    return action.type === 'SEARCH_TERM_SET'
}
function isCategoryAction(action: Action): action is SearchTermAction {
    return action.type === 'SET_CATEGORY'
}
function isOverviewQueryAction(action: Action): action is SearchTermAction {
    return action.type === 'SET_OVERVIEW_QUERY'
}
function isBaseLoadedAction(action: Action): action is SearchTermAction {
    return action.type === 'SET_BASE_LOADED'
}
    
const rootReducer = () => (state = initialState, action: Action) => {
    if (isSearchTermAction(action)) {
        return {
            ...state,
            searchTerm: action.payload
        }
    }
    if (isCategoryAction(action)) {
        return {
            ...state,
            category: action.payload
        }
    }
    if (isOverviewQueryAction(action)) {
        return {
            ...state,
            overviewQuery: action.payload
        }
    }
    if (isBaseLoadedAction(action)) {
        return {
            ...state,
            baseLoaded: action.payload
        }
    }
    return state;
}
    
export default rootReducer