import React, {Component} from 'react';
import '../App.css' ;
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import 'react-rangeslider/lib/index.css';
import AlertModal2 from './AlertModal2';
import { removeFromWatch, removeFromWatch2, watch, logOutUser, addItemToWatch2, removeFromUserWatch, watchUser, resetEntireWatch } from '../actions/product';
import MobileSignIn2 from './MobileSignIn2';
import uuid from 'react-uuid';
import {store} from '../index.js';


const axios = require('axios');


async function getWatchList(user){

    if(user !== ""){
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
              "userId" : user       
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


class WatchlistRoute extends Component {
    constructor(props){
        super(props);

        this.state={
            loading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handRemove = this.handleRemove.bind(this);
        this.handRemove2 = this.handleRemove2.bind(this);

    }

    handleRemove(item){
        this.props.removeFromWatch(item);
        this.props.watch(item);
    }

    handleRemove2(item){
        console.log("handleRemove2 called....");
        this.props.watch(item);
        this.props.watchUser(item);
        this.props.removeFromUserWatch(item);
        this.props.removeFromWatch(item);
        this.props.removeFromWatch2(item);
        removeWatchListItems(item);
    }

    handleLogin(){
        this.setState({loading: true});
    }

    handleLogOut(){
        this.props.logOutUser();
        this.props.resetEntireWatch();
    }

    userItemTitles(userItems){
        let titles = [];
        for(let k of userItems){
          titles.push(k.title);
        }
      
        return titles;
      }
    
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

    async componentDidMount(){

        if(this.props.storeUserId !== ""){
            let signedUserItems = await getWatchList(this.props.storeUserId);
            console.log("signedUserItems (mobile)", signedUserItems);
            console.log("usersWatchedItems (mobile)", this.props.usersWatchedItems);

            let titles = this.userItemTitles(this.props.usersWatchedItems);
            console.log(titles);

            if(signedUserItems){
                for(let k = 0; k < signedUserItems.length; k++){
                    if(!titles.includes(signedUserItems[k].title)){
                        this.props.addItemToWatch2(signedUserItems[k]);
                    }
                    else{
                        console.log("Attempt to add duplicate was prevented :)")
                    }
                }
            }
        }
    }

    render(){

        const { watchedItems, usersWatchedItems, storeUserId } = this.props;

        console.log("watchedItems: ", watchedItems);
        console.log("userWatchedItems: ", usersWatchedItems);
        console.log(storeUserId);

        return (
            <div className="watchlistRoutePage">
                <div className="watchlistContainerBar">
                    <div className="returnToSearchIcon"><Link to={'/'}><p data-tip={"Return to item search"} ><i className="material-icons keyboardReturnIcon">keyboard_return</i></p></Link></div>
                    <ReactTooltip />
                    <div>My Poof! Watchlist</div>
                    {storeUserId == "" ? <MobileSignIn2 login={this.handleLogin}/> : <div className="logOutUserWatchRoute"><p data-tip={"Click to log out"} ><i className="material-icons WatchLogOutUserIcon" onClick={() => this.handleLogOut()}>cloud_off</i></p></div> }<ReactTooltip />
                </div>

                {this.state.loading? 
                
                <div className="loadingUserItems">
                    <h4 className="mobileLoadingText" style={{textAlign: "center"}}>
                        Just one moment while we retrieve your Poof! Watchlist
                    </h4>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-green-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                :

                usersWatchedItems.length > 0 ? usersWatchedItems.map(item =>
                    <div className="container watchlistRouteContainer">
                            <div className="card watchCard">
                                <div className="row">
                                    <div className="col-4 col-sm-3">
                                        <img src={item.image} className="img-fluid watchRouteImage" alt={item.title}/>
                                    </div>
                                    <div className="col-8 col-sm-9">
                                        <div className="card-body">
                                            <h5 className="card-title watchRouteCardTitle">{item.title}</h5>
                                            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-5 priceTag2">{`$${item.price}`}</div>
                                        {/* <div className="col-3" style={{fontSize: "large", paddingTop: "8px"}}>{item.source}</div> */}
                                        <div className="col-7 watchlistButtons">
                                            <AlertModal2 key={uuid()} item={item} alert={this.setAlert}/>
                                            
                                            <span><i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove2(item)}>cancel</i></span>
                                            <ReactTooltip />
                                            <span className="purchaseLinkBtnMobile">
                                                <a href={`${item.itemUrl ? item.itemUrl : item.link}`}  target="_blank" className="purchaseLinkBtnAnchorMobile"><i className="material-icons purchaseLinkIconBtnMobile" data-tip={"Go to product source"}>launch</i></a>
                                                <ReactTooltip />
                                            </span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    )
                
                    :

                    watchedItems.length > 0 ? watchedItems.map(item =>
                        <div className="container watchlistRouteContainer">
                            <div className="card watchCard">
                                <div className="row">
                                    <div className="col-4 col-sm-3">
                                        <img src={item.image} className="img-fluid watchRouteImage" alt={item.title}/>
                                    </div>
                                    <div className="col-8 col-sm-9">
                                        <div className="card-body">
                                            <h5 className="card-title watchRouteCardTitle">{item.title}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-6 priceTag2">{`$${item.price}`}</div>
                                        {/* <div className="col-3" style={{fontSize: "large", paddingTop: "8px"}}>{item.source}</div> */}
                                        {/* <div className="fillerRoute"></div> */}
                                        <div className="col-4 watchlistButtons">
                                            <span><i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove(item)}>cancel</i></span>
                                            <ReactTooltip />
                                            <span className="purchaseLinkBtnMobile">
                                                <a href={`${item.itemUrl ? item.itemUrl : item.link}`}  target="_blank" className="purchaseLinkBtnAnchorMobile"><i className="material-icons purchaseLinkIconBtnMobile" data-tip={"Go to product source"}>launch</i></a>
                                                <ReactTooltip />
                                            </span>
                                        </div>
                                </div>
                            </div>
                        </div>
                        )

                        : 

                        <div style={{textAlign: "center", marginTop: "30px"}}>You have 0 items in your Poof! watch list.</div>
                        
                    }
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
        addItemToWatch2: (item) => { dispatch(addItemToWatch2(item)) },
        resetEntireWatch: () => {dispatch(resetEntireWatch())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistRoute);