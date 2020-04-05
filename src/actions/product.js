import * as types from '../constants/types'

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Content-Type", "text/plain");

var raw = "{\"keywords\": \"iphone 11\"}";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

export const getProducts = () =>

  dispatch =>
    fetch("https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice", requestOptions)
      .then(response => response.json())
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
