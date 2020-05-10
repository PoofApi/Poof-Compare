import React, {Component} from 'react';
import '../App.css';
import Modal3 from './Modal3.js';
import {store} from '../index.js';

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
        },
      })
    
      let confirmation = await response.data;
      console.log("Successfully added item to firebase watchlist!: ", confirmation, item.title);
    }
  
    catch(err){
      console.log(err, "Unable to set items into watchlist");
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

    render(){
        return(
            <div className="watchlist-container">
                <div className="watchlist-navbar" style={{height: "30px", backgroundColor: "black", position: "fixed", width: "100%"}}>
                    <i className="material-icons toggle-watchlist" onClick={() => this.props.toggleClick()} >chevron_right</i>
                    <div className="watchlist-title">
                        My Poof! WatchList
                    </div>
                </div>

                <div className="watchContainer2">
                    {this.props.items.map(item =>
                        <div>
                                <img className="watchImage" src={item.image} alt={item.title} key={item.id}/>
                        </div>
                    )}
                </div>

                <div className="save-container">
                    <Modal3 />
                    <a className="btn test2" onClick={() => console.log(store.getState().item.storeUserId)}>Test Store</a>
                    <a className="btn testButton" onClick={() => this.submitWatchList("test2@gmail.com")}>Test Watch List</a>
                </div>
            </div>
        )
    }
    
}

export default WatchList;