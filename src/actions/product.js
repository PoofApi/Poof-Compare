import * as types from '../constants/types'
import { store } from '../index.js';

const axios = require('axios');

export const getProducts = (keywords) =>

  dispatch =>
    axios({
      method: 'post',
      url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
      headers: {
        "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      data: {"keywords" : keywords},
    })
    .then(response => response.data)
    .then(response => {
      dispatch({
        type: types.FETCH_PRODUCTS,
        payload: response.items
      })
      alert("Get Products was called");
    })


export const compare = item => ({
    type: types.COMPARE_PRODUCT,
    item
  })

export const watch = item => ({
    type: types.WATCH_PRODUCT,
    item
  })

export const resetSearch = () => ({
  type: types.RESET_PRODUCTS
})

export const saveUser = (payload) => ({
  type: types.ADD_USER,
  payload: payload
})

export const addToWatch = (payload) => ({
  type: types.ADD_WATCH,
  payload: payload
})

export const addItemToWatch = (payload) => ({
  type: types.ADD_WATCH_ITEM,
  payload: payload
})

export const removeFromWatch = (payload) => ({
  type: types.REMOVE_WATCH,
  payload: payload
})

export const resetWatchList = () => ({
  type: types.RESET_WATCH
})

export const includeToWatch = (item) => ({
  
})

export const alreadyInWatch = (payload) => ({
  type: types.ALREADY_WATCHED,
  payload: payload
})

export const alreadyInWatch2 = (item) => ({
  type: types.ALREADY_WATCHED2,
  item
})


