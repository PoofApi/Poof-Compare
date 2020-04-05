import * as types from '../constants/types'

const INITIAL_STATE = {
  items: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state, items: action.payload.map(item =>
          ({...item, compare: false})
        )
      };
    case types.COMPARE_PRODUCT:
      return {
        ...state, items: state.items.map(item =>
          item.id === action.item.id ?
            ({...item, compare: !item.compare}) :
            item
        )
      };
    default:
      return state
  }
}
