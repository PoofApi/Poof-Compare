import * as types from '../constants/types'
import { store } from '../index.js';

const axios = require('axios');

export async function setWatchList(item){

  try{
    let response = await axios({
      method: 'post',
      url: "https://us-central1-poofapibackend.cloudfunctions.net/watchList-setWatchlistItem",
      headers: {
        "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      data: {
          "userId" : store.getState().item.storeUserId,
          "title" : item.title,
          "itemUrl" : item.link,
          "price" : item.price,   
          "image" : item.image,
          "itemId": item.id      
      },
    })
  
    let confirmation = await response.data;
    console.log("Successfully added item to firebase watchlist!: ", confirmation, item.title);
  }

  catch(err){
    console.log(err, "Unable to set items into watchlist");
  }
}

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

export const watchUser = item => ({
    type: types.WATCH_USER_PRODUCT,
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

export const addItemToWatch2 = (payload) => ({
  type: types.ADD_WATCH_ITEM2,
  payload: payload
})

export const removeFromWatch = (payload) => ({
  type: types.REMOVE_WATCH,
  payload: payload
})

export const removeFromWatch2 = (payload) => ({
  type: types.REMOVE_WATCH2,
  payload: payload
})

export const removeFromUserWatch = (payload) => ({
  type: types.REMOVE_USER_WATCH,
  payload: payload
})

export const resetWatchList = () => ({
  type: types.RESET_WATCH
})

export const resetEntireWatch = () => ({
  type: types.RESET_ALL_WATCH
})

export const includeToWatch = (item) => ({
  
})

export const loadUsersItems = (payload) => ({
  type: types.LOAD_ITEMS,
  payload: payload
})

export const logOutUser = () => ({
  type: types.LOGOUT_USER
})

export const addSignInWatch = () => ({
  type: types.SIGN_IN_WATCH
})


