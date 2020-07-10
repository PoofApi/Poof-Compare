import * as types from '../constants/types'

const INITIAL_STATE = {
  items: [],
  isLoading: true,
  storeUserId: "",
  watchedItems: [],
  usersWatchedItems: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state, isLoading: false, items: action.payload.map(item =>
          ({...item, compare: false, watch: false})
        )
      };
    case types.FETCH_PRODUCTS2:
      return {
        ...state, isLoading: false, items: action.payload.map(item =>
          ({...item, compare: false, watch: false})
        )
      };

    case types.RESET_PRODUCTS:
      return {
        ...state, items: [], isLoading: false
      };
    
    case types.RESET_WATCH:
      return {
        ...state, watchedItems: []
      }

    case types.COMPARE_PRODUCT:
      return {
        ...state, isLoading: false, items: state.items.map(item =>
          item.id === action.item.id ?
            ({...item, compare: !item.compare}) :
            item
        )
      };
    case types.WATCH_PRODUCT:
      return {
        ...state, isLoading: false, items: state.items.map(item =>
          item.id === action.item.id ?
            ({...item, watch: !item.watch}) :
            item
        )
      };
    
    case types.RESET_ALL_WATCH:
      return {
        ...state, isLoading: false, items: state.items.map(item =>
            ({...item, watch: false}) 
        )
      };

    case types.WATCH_USER_PRODUCT:
      return {
        ...state, isLoading: false, items: state.items.map(item =>
          item.id === action.item.itemId ?
            ({...item, watch: !item.watch}) :
            item
        )
      };

    case types.ADD_USER:
      return {
        ...state, storeUserId: action.payload
      };
    
    case types.LOGOUT_USER:
      return {
        ...state, storeUserId: "", usersWatchedItems: []
      }

    case types.ADD_WATCH:
      return {
        ...state, watchedItems: state.watchedItems.concat(action.payload.map(item => 
            ({...item, compare: false, watch: true})
          )
        )
      };

    case types.ADD_WATCH_ITEM:
      return {
        ...state, watchedItems: state.watchedItems.concat(action.payload), 
        usersWatchedItems: (state.storeUserId !== "" ? state.usersWatchedItems.concat(action.payload)
        : state.usersWatchedItems)
      };

    case types.ADD_WATCH_ITEM2:
      return {
        ...state, usersWatchedItems: state.usersWatchedItems.concat(action.payload)
      }; 
    
    case types.SIGN_IN_WATCH:
      return {
        ...state, usersWatchedItems: state.usersWatchedItems.concat(state.watchedItems)
      };
    
    case types.INCLUDE_WATCH:
      return {
        ...state, watchedItems: state.watchedItems.map(item => 
          item.id === action.item.id?
            ({...item, watch: !item.watch}) :
            item
          )
      };

    case types.REMOVE_WATCH:
      return {
        ...state, watchedItems: state.watchedItems.filter(item => item !== action.payload)
      };
    
    case types.REMOVE_WATCH2:
      return {
        ...state, watchedItems: state.watchedItems.filter(item => item.id !== action.payload.itemId)
      };

    case types.REMOVE_USER_WATCH:
      return {
        ...state, usersWatchedItems: state.usersWatchedItems.filter(item => item !== action.payload)
      };
    
    case types.LOAD_ITEMS:
      return {
        ...state, usersWatchedItems: action.payload.map(item =>
            ({...item, compare: false, watch: true})
          )
      }
    
    default:
      return state
  };
}
