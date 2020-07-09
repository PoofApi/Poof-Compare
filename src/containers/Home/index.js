import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Compare, ProductList} from '../../components'
import * as productActions from '../../actions/product'
import {connect} from 'react-redux';
import Header from '../HeaderComponent.js';
import Header2 from '../HeaderComponent2.js';
import CompareToolbar from '../compareToolbar.js';
import WatchList from '../WatchListComponent.js';
import WatchToolbar from '../WatchToolbarComponent.js';
import Loading from '../LoadingComponent.js';
import './styles.css';
import {store} from '../../index.js';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import uuid from 'react-uuid';


const axios = require('axios');

const getTitles = (list) => {

  let titles = [];
  list.forEach(element => titles.push(element.title));
  
  return titles;
}
// Part of previous code that used Eric's backend

// async function getItems(){
//   console.log("Now fetching items.........")

//   try{
//     let response = await axios({
//       method: 'post',
//       url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
//       headers: {
//         "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
//         "Accept" : "application/json",
//         "Content-Type" : "application/json",
//       },
//       data: {"keywords" : "gamecube controller"},
//     })
  
//     let items = await response.data;
//     console.log(items);
//   }

//   catch(err){
//     alert(err);
//     console.log("An error occurred!!!!!: ", err);
//   }
// }

async function setWatchList(item, storedList){

  //Helper function to prevent duplicate entry into user's watchlist
  let titles = getTitles(storedList);
  console.log(titles);
  console.log(titles.includes(item.title));

  if (!titles.includes(item.title)){

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

  else{
    return console.log("Item already exists in user's list!");
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function userType(email){
  if (validateEmail(email)){
    return "email";
  }
  else{
    return "text";
  }
}

async function getWatchList(){

  if(store.getState().item.storeUserId !== ""){
    try{
      let response = await axios({
        method: 'post',
        url: "https://us-central1-poofapibackend.cloudfunctions.net/watchList-getWatchListItems",
        headers: {
          "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
          "Accept" : "application/json",
          "Content-Type" : "application/json",
        },
        data: {
            "userId" : store.getState().item.storeUserId       
        },
      })
    
      let confirmation = await response.data;
      console.log("Successfully retrieved watchlist!: ", confirmation);
      return confirmation;
    }
  
    catch(err){
      console.log(err, "Unable to retrieve watchlist");
    }
  }
  else {
    return console.log("User is not signed in");
  }
}


class Home extends Component {
  
  state = {
    compareTableOpen: true,
    compareToolbarOpen: false,
    watchListOpen: true,
    watchToolbarOpen: false,
    watchItemsState: this.props.items.filter(item => item.watch)
  };

  toggleCompare = () => {
    this.toggleCompareToolbar();
    this.setState((prevState) => {
      return {compareTableOpen: !prevState.compareTableOpen};
    })
  };

  toggleCompareToolbar = () => {
    this.setState({compareTableOpen: true});
    this.setState((prevState) => {
      return {compareToolbarOpen: !prevState.compareToolbarOpen};
    })
  };

  closeWatchList = () => {
    this.setState({watchListOpen: false});
    this.setState({watchToolbarOpen: true});
  };

  toggleWatchToolbar = () => {
    this.setState({watchListOpen: true});
    this.setState({watchToolbarOpen: false});
  }

  saveList = () => {
    const watchItems = this.props.items.filter(item => item.watch);
    console.log("User's current watchlist: ", watchItems);
  }

  compareLists(items, storeWatchItems){
    for (let k = 0; k < storeWatchItems.length; k++){
      let watchItemName = storeWatchItems[k].title;

      for (let j=0; j < items.length; j++){
        let itemName = items[j].title;
        if (itemName == watchItemName){
          items[j].watch = true;
        }
      }
    }
  }

  addId(items){
    for(let item of items){
      if(!item.id){
        item.id = uuid();
      }
    }

    return items;
  }

  checkIfInWatch(){
    const products = this.props.items;
    const storeWatch = this.props.watchedItems;
  
    this.compareLists(products, storeWatch);
  }

  checkIfInWatch2(){
    const products = this.props.items;
    const usersWatch = this.props.usersWatchedItems;

    this.compareLists(products, usersWatch);
  }

  async getUsersItems(){
    let usersItems = await getWatchList();
    return usersItems;
  }

  async componentDidMount(){

    if(this.props.storeUserId !== ""){
      
      if(this.props.watchedItems){
        let previousWatchItems = this.props.watchedItems;
        // let previousWatchItems = this.props.watchedItems;
        await previousWatchItems.map(item => setWatchList(item, this.props.usersWatchedItems));
      }
      
      let items = await this.getUsersItems();
      if(items){
        store.dispatch(this.props.actions.loadUsersItems(items));
      }
    }
  }

  handleLogOut(){
    const searchItems = this.props.items
    if (this.props.storeUserId == ""){
      for (let k = 0; k < searchItems.length; k++){
        searchItems[k].watch = false;
      }
    }
  }

  //Ready to be implemented once Eric deploys this function
  async setAlert(targetPrice, item){

    const user = store.getState().item.storeUserId;
    const type = userType(user);
    console.log("setAlert function has been called......")
  
    try{
      let response = await axios({
        method: 'post',
        url: "https://us-central1-poofapibackend.cloudfunctions.net/alert-setAlert",
        headers: {
          "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
          "Accept" : "application/json",
          "Content-Type" : "application/json",
        },
        data: {
            "userId" : store.getState().item.storeUserId,
            "title" : item.title,
            "itemUrl" : item.link ? item.link : item.itemUrl,
            "price" : item.price,
            "itemId": item.id ? item.id : item.itemId,  
            "which": type,
            "priceTarget": targetPrice         
        },
      })
    
      let confirmation = await response.data;
      alert(`Successfully set an alert for ${item.title}!`, confirmation);
    }
  
    catch(err){
      alert(err, `We're very sorry. Poof! was unable to set an alert for ${item.title}. Please try again later.`);
    }
  }

//   async componentDidUpdate(previousProps, previousState) {
//     this.checkIfInWatch();

//     console.log("ComponentDidUpdate called!");

//     // This was previously backslashed out
//     // store.dispatch(this.props.actions.addSignInWatch());

//     if (previousProps.data !== this.props.data && this.props.storeUserId !== "") {

//       let previousWatchItems = this.props.watchedItems;
//       console.log(previousWatchItems);
//       console.log(store.getState().item.storeUserId);
//       await previousWatchItems.map(item => setWatchList(item));

//       let items = await this.getUsersItems();
//       store.dispatch(this.props.actions.loadUsersItems(items));
//     }
// }

  componentDidUpdate(){
    // console.log("Product items: ", this.props.items);
  }


  render() {

    // getItems();

    
    const {items, actions, isLoading, watchedItems, usersWatchedItems, storeUserId} = this.props;

    let revisedItems = this.addId(items);
    // console.log("Revised items WITH ids: ", revisedItems);
    
    const compareProducts = items.filter(item => item.compare);
    const storeWatchProducts = watchedItems;

    // console.log(usersWatchedItems);

    this.checkIfInWatch();
    this.checkIfInWatch2();

    return (
      
      <div>

    {this.props.items.length > 0 ? <div><Header2 user={this.props.storeUserId} items={this.props.items} /> {(storeWatchProducts.length > 0 || usersWatchedItems.length > 0)
    && (this.state.watchListOpen) ? <WatchList alert={this.setAlert} items={this.props.storeUserId !== "" ? 
    usersWatchedItems : storeWatchProducts} products={this.props.items} user={this.props.storeUserId} toggleClick={this.closeWatchList} saveClick={this.saveList} 
    watch={actions.watch} /> : <div></div>} {(this.props.storeUserId !== "" ? usersWatchedItems.length > 0 : storeWatchProducts.length > 0) 
    && !this.state.watchListOpen ? <WatchToolbar toggleClick={this.toggleWatchToolbar} /> : <div></div> } </div>: 
        <div>
          <Header />
        </div>
        }

        {/* Previous "Reset Button" used to return home and reset search items */}
        {/* {this.props.items.length > 0 && 
          <div className="resetButton" onClick={() => this.props.actions.resetSearch()} style={{cursor: "pointer", borderColor: "black", zIndex: "99", border: "3px solid white", position: "fixed", top: "11%", right: "2%", marginLeft: "10px", marginTop: "10px", backgroundColor: "black", padding: "5px", fontWeight: "770", color: "white", borderRadius: "10px"}}>
            <div style={{float:"right"}}>
              Click to Reset Search
            </div>
          </div>
        } */}
        
        {this.props.items.length > 0 && 
        <div className="productHome">
          <div className="home mt-5">
            <ProductList items={items} compare={actions.compare} watch={actions.watch}/>
            {/* <div className="mobile-watchlist">
              <Link className="mobile-watchlist2" to={'/watchlist'}><p data-tip={"My Poof! Watchlist"} ><i className="material-icons mobile-watchlist-icon">view_list</i></p></Link>
              <ReactTooltip />
            </div> */}
            <div className={compareProducts.length >= 1 ? "compareTable" : "filler"} style={{display: (this.state.compareToolbarOpen ? "none" : "block")}}>
              {compareProducts.length >= 1 && (this.state.compareTableOpen) ? 
                <Compare items={compareProducts} toggleClick={this.toggleCompare} 
              />

              :

              <div></div> }
           </div>

           {this.state.compareToolbarOpen && compareProducts.length >= 1 ? <CompareToolbar toggleToolbar={this.toggleCompareToolbar} /> : <div></div> }
          </div>
        </div>
        }
      </div>
     
    )
  }
}

export default connect(
  state => ({
    items: state.item.items,
    watchedItems: state.item.watchedItems,
    usersWatchedItems: state.item.usersWatchedItems,
    storeUserId: state.item.storeUserId
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home)
