import React, {Component} from 'react';
import '../App.css';
import VolumeSlider from './VolumeSliderComponent.js';
import Modal3 from './Modal3.js';
import {store} from '../index.js';
import ReactTooltip from 'react-tooltip';
import { addToWatch, removeFromWatch,watchUser, removeFromWatch2, removeFromUserWatch, logOutUser, watch, addItemToWatch2 } from '../actions/product';
import 'react-rangeslider/lib/index.css';
import AlertModal from './AlertModal';
import SaveUserModal from './SaveUserModal';
import {connect} from 'react-redux';


const axios = require('axios');

async function setWatchList(item){

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


async function getWatchList(){

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
    }
  
    catch(err){
      console.log(err, "Unable to retrieve watchlist");
    }
  }

  async function removeWatchListItems(item){

    console.log("removeWatchlistitem function was called.....");
    const user = store.getState().item.storeUserId;

    if(user !== ""){
        try{
        let response = await axios({
            method: 'post',
            url: "https://us-central1-poofapibackend.cloudfunctions.net/watchList-removeWatchListItems",
            headers: {
            "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            },
            data: {
                "userId" : user,
                "itemId" : item.itemId ? item.itemId : item.id      
            },
        })
        
        let confirmation = await response.data;
        console.log(`Successfully removed ${item.title} from watchlist!: `, confirmation);
        return confirmation;
        }

        catch(err){
        console.log(err, "Unable to remove item from user's watchlist database");
        }
    }
    else {
        return console.log("User is not signed in");
    }
  }

class WatchList extends Component {
    constructor(props){
        super(props);

        this.state= {
            watchItems: []
        }

        this.submitWatchList = this.submitWatchList.bind(this);
    }

    submitWatchList(userId){
      {this.props.items.map(item => setWatchList(item))};
    };

    saveWatchList(items){
      store.dispatch(addToWatch(items));
      console.log(store.getState().item.watchedItems);
    };

    showState(){
      console.log(store.getState());
    };

    removeItem(watchFxn, item){
      console.log("desktop removeItem fxn called....");
      watchFxn(item);
      this.props.watchUser(item);
      this.props.removeFromWatch(item);
      this.props.removeFromUserWatch(item);
      this.props.removeFromWatch2(item);
      removeWatchListItems(item);
    }

    render(){
        return(
            <div className="watchlist-container">
                <div className="watchlist-navbar" style={{height: "30px", backgroundColor: "#0C1344", position: "fixed", width: "100%"}}>
                    <i className="material-icons toggle-watchlist" onClick={() => this.props.toggleClick()} >chevron_right</i>
                    <div className="watchlist-title">
                        My Poof! WatchList
                    </div>
                </div>

                <div className="watchContainer2">
                    {this.props.items.map(item =>
                        <div className="container">
                              <div className="card mb-3" style={{maxWidth: "540px", height: "150px"}}>
                                <div className="row no-gutters">
                                  <div className="col-md-4" style={{position: "relative", left: "5%", top: "3%"}}>
                                    <img src={item.image} alt={item.title} key={item.id} style={{maxWidth: "100%", maxHeight: "60%"}}/>
                                  </div> 
                                  <div className="card-price" style={{position: "absolute", left: "14%", bottom: "10%", color: "tomato"}}>
                                    <b>{`$${item.price}`}</b>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <h5 className="card-title desktopWatchlistItemTitle" style={{ height:"3.5em" , fontSize:"18px", overflow:"hidden"}}>{item.title}</h5>
                                      {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                      <div className="card-text">
                                         
                                            <div className="row desktopButtonRow" style={{display: "flex", justifyContent: "flex-end"}}>
                                              
                                              <div style={{marginTop: "6.5px"}}>
                                                 <AlertModal item={item} alert={this.props.alert}/>
                                              </div> 
                                              
                                              <div>
                                                <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.removeItem(this.props.watch, item)}>cancel</i>
                                                <ReactTooltip />
                                              </div>

                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="watchItemContainer">
                                <img className="watchImage" src={item.image} alt={item.title} key={item.id}/>
                                <span className="iconContainer">
                                  <AlertModal item={item} alert={this.props.alert}/>
                                  <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.removeItem(this.props.watch, item)}>cancel</i>
                                  <ReactTooltip />
                                </span>
                              </div>
                              <div>
                                <div className="itemName" style={{ textAlign: "center"}}>
                                  {item.title}
                                </div>
                                <div className="itemPrice" style={{marginTop: "10px", textAlign: "center", fontWeight: "1000"}}>
                                  {item.price}
                                </div>
                              </div> */}
                              
                        </div>
                    )}
                </div>

                {/* <a className="btn saveBtn" >Save</a> */}

                <div>
                  <div className="saveBtn">
                    {this.props.user == "" ? <Modal3 userItems={this.props.items} products={this.props.products} /> : <span></span>}
                  </div>
                    {/* <a className="btn test2" onClick={getWatchList}>Test</a>
                    <a className="btn saveWatchBtn" onClick={() => this.saveWatchList(this.props.items)}>Save</a> */}
                    <SaveUserModal />
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
      watchedItems: state.item.watchedItems,
      usersWatchedItems: state.item.usersWatchedItems,
      storeUserId: state.item.storeUserId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      watchUser: (item) => { dispatch(watchUser(item)) },
      removeFromUserWatch: (item) => { dispatch(removeFromUserWatch(item)) },
      removeFromWatch : (item) => { dispatch(removeFromWatch(item)) },
      removeFromWatch2 : (item) => { dispatch(removeFromWatch2(item)) },
      watch: (item) => { dispatch(watch(item)) },
      logOutUser: () => {dispatch(logOutUser())},
      addItemToWatch2: (item) => { dispatch(addItemToWatch2(item)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);