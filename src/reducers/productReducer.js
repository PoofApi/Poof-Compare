import * as types from '../constants/types'

const INITIAL_STATE = {
  items: [],
  isLoading: true,
  storeUserId: ""
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
    
    default:
      return state
  };
}
