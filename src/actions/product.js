import * as types from '../constants/types'
import { store } from '../index.js';

const axios = require('axios');

export const getProducts = () =>

  dispatch =>
    axios({
      method: 'post',
      url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
      headers: {
        "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      data: {"keywords" : "mario party"},
    })
    .then(response => response.data)
    .then(response => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        payload: response.items
      })
    })

  

export const compare = item => ({
    type: types.COMPARE_PRODUCT,
    item
  })

export const resetSearch = () => ({
  type: types.RESET_PRODUCTS
})