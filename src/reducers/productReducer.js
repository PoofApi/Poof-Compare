import * as types from '../constants/types'

const INITIAL_STATE = {
  items: [],
  isLoading: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state, isLoading: false, items: action.payload.map(item =>
          ({...item, compare: false})
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
    default:
      return state
  }
}
