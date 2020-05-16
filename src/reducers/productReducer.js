import * as types from '../constants/types'

const INITIAL_STATE = {
  items: [],
  isLoading: true,
  storeUserId: "",
  watchedItems: []
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

    case types.ADD_USER:
      return {
        ...state, storeUserId: action.payload
      };

    case types.ADD_WATCH:
      return {
        ...state, watchedItems: state.watchedItems.concat(action.payload.map(item => 
            ({...item, compare: false, watch: true})
          )
        )
      };

    case types.ADD_WATCH_ITEM:
      return {
        ...state, watchedItems: state.watchedItems.concat(action.payload)
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
    
    default:
      return state
  };
}
