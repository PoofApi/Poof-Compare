import React, {Component} from 'react';
import './styles.css';
import './newStyles.css';
import ReactTooltip from 'react-tooltip';
import {store} from '../../index.js';
import {addItemToWatch, removeFromWatch} from '../../actions/product.js';

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
            "image" : item.image         
        },
      })
    
      let confirmation = await response.data;
      console.log("Successfully added item to firebase watchlist!: ", confirmation, item.title);
    }
  
    catch(err){
      console.log(err, "Unable to set items into watchlist");
    }
}


class Product extends Component{
    constructor(props){
        super(props);

        this.handleWatch = this.handleWatch.bind(this);
    }

    handleWatch(watchFxn, product) {
        
        //Assigns item to cache watchlist
        watchFxn(product);
      

        //Adds item to browser watchlist
        store.dispatch(addItemToWatch(product));

        //If user is signed in with email or phone#, item is added to their watchlist on the firebase database as well
        if (store.getState().item.storeUserId !== ""){
            setWatchList(product);
          };
    }

    itemInList(item){
        const watchListItems = store.getState().item.watchedItems
        for (let k = 0; k<(watchListItems.length); k++){
            if (item.id == watchListItems[k].id){
                return true;
            }
            else{
                return false;
            }
        }
    }

    removeItem(watchFxn, item){
        watchFxn(item);

        store.dispatch(removeFromWatch(item));
    }

    render(){

        return(

        <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="row">
                <div className="col s12 m6">
                    <div className={" " + (this.props.item.compare ? "compare" : "")} >
                            <div className="card" >
                                    <div className="card-image itemImage">
                                            <img src={this.props.item.image} alt={this.props.item.title} style={{height:"250px", width: "100%"}}/>
                                            <p data-tip={(this.props.item.watch ? "This item is currently in your watchlist" : "Add to watchlist")} ><a className="btn-floating halfway-fab floatingWatchBtn indigo darken-4"><i className="material-icons" style={{color: (this.props.item.watch? "red" : "white")}} onClick={(this.props.item.watch) ? () => console.log("If you would like to remove this item from your watchlist, please remove it through the watchlist tab") : () => this.handleWatch(this.props.watch, this.props.item)}>{this.props.item.watch? "favorite" : "remove_red_eye"} </i></a></p>
                                            <ReactTooltip />
                                            <span className="itemPrice">{this.props.item.price}</span>
                                        <div className="card-overlay"></div>
                                        <div className="detailsBtn" onClick={() => this.props.compare(this.props.item)} style={{color: "black", display: "flex", justifyContent: "center", alignItems:"center"}}>{this.props.item.compare ? "Hide Details" : "View Details"}</div>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title" style={{ height:"4em" , lineHeight:"1.3em" ,fontSize:"18px", overflow:"hidden", position: "relative", bottom: "30%"}}>{this.props.item.title}</span>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        // <div className="col-sm-6 col-md-3">
        //     <div className={"product " + (this.props.item.compare ? "compare" : "")} >
        //         <img style={{width: "100%", height: "400px"}} src={this.props.item.image} alt={this.props.item.title} />
        //         <div className="image_overlay"/>
        //         <div className="view_details" onClick={() => this.props.compare(this.props.item)}>
        //         {this.props.item.compare ? "Hide Details" : "Details"}
        //         </div>
        //         <div className="stats">
        //             <div className="stats-container">
        //                 <span className="product_price">{this.props.item.price}</span>
        //                 <div className="buttonContainer" style={{display: "flex", justifyContent: "center", marginLeft: "60px"}}>
        //                     <p data-tip={(this.props.item.watch ? "This item is currently in your watchlist" : "Add to watchlist")} ><i className="material-icons watchButton" 
        //                     style={{color: (this.props.item.watch? "darkgoldenrod" : "black")}} 
        //                     onClick={(this.props.item.watch) ? () => console.log("If you would like to remove this item from your watchlist, please remove it through the watchlist tab") : () => this.handleWatch(this.props.watch, this.props.item)}>remove_red_eye</i></p>
        //                     <ReactTooltip />
        //                 </div>
        //                 <div className="name-container" style={{display: "flex", textAlign: "center", marginLeft: "50px"}}>
        //                     <span className="product_name" style={{position: "relative"}}>{this.props.item.title}</span>
        //                     </div>
        //                 {/* Previous line to allow for short details about the product */}
        //                 {/* <p style={{position:"relative", top: "10px"}}>{item.short}</p> */}
        //                 </div>
        //         </div>
        //     </div>
        // </div>
        // )}
} 
    

export default Product
