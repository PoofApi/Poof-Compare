import React, {Component} from 'react';
import '../App.css' ;
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import 'react-rangeslider/lib/index.css';
import AlertModal2 from './AlertModal2';
import { removeFromWatch, removeFromWatch2, watch, logOutUser, addItemToWatch2, removeFromUserWatch, watchUser } from '../actions/product';
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

    // removeOverlay(){
        
    //     var overlay = document.getElementById("sidenav-overlay");
        
    //     if(overlay){
    //         overlay.style.display = "none";
    //     }
    // }

    // componentDidMount(){
    //     this.removeOverlay();
    // }

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
                "itemUrl" : item.link,
                "price" : item.price,
                "itemId": item.id,  
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
            console.log("signedUserItems", signedUserItems);
            console.log("usersWatchedItems", this.props.usersWatchedItems);

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

    // async componentDidUpdate(){
    //     if(this.props.storeUserId !== ""){
    //         let signedUserItems = await getWatchList(this.props.storeUserId);
    //         console.log(signedUserItems);
    //         if(signedUserItems){
    //             signedUserItems.map(item => this.props.addItemToWatch2(item));
    //         }    
    //     }
    // }

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
                {/* <div className="returnToSearch">
                    <div className="returnTitle"><Link to={'/'}>Return to item search</Link></div>
                </div> */}
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
                    // <div className="container">
                    //     <div className="card mb-3" style={{maxWidth: "540px", height: "150px"}}>
                    //     <div className="row no-gutters">
                    //         <div className="col-2 col-md-4" style={{position: "relative", left: "5%", top: "3%"}}>
                    //             <img src={item.image} alt={item.title} key={item.id} style={{maxWidth: "100%", maxHeight: "60%"}}/>
                    //         </div> 
                    //         <div className="card-price" style={{position: "absolute", left: "8%", bottom: "10%", color: "tomato"}}>
                    //         <b>{`$${item.price}`}</b>
                    //         </div>
                    //         <div className="col-8 col-md-8">
                    //         <div className="card-body watchRouteCard">
                    //             <h5 className="card-title watchRouteCardTitle" style={{ height:"3.5em" , fontSize:"16px"}}>{item.title}</h5>
                    //             {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                    //             <div className="card-text">
                                    
                    //                 <div className="row" style={{display: "flex", justifyContent: "flex-end"}}>
                    //                     {/* {this.props.user !== "" ?  */}
                                        
                    //                     <div style={{marginTop: "6.5px"}}>
                    //                         <AlertModal2 key={uuid()} item={item} alert={this.props.alert}/>
                    //                     </div> 
                                        
                    //                     {/* :
                                        
                    //                     <div></div>
                                        
                    //                     } */}
                                        
                    //                     <div style={{position: "relative", right: "8%"}}>
                    //                     <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove(item)}>cancel</i>
                    //                     <ReactTooltip />
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //         </div>
                    //     </div>
                    //     </div>
                    // </div>
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
                                        <div className="col-3" style={{fontSize: "large", paddingTop: "8px"}}>{item.source}</div>
                                        <div className="col-4 watchlistButtons">
                                            <AlertModal2 key={uuid()} item={item} alert={this.setAlert}/>
                                            
                                            <span><i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove2(item)}>cancel</i></span>
                                            <ReactTooltip />
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
                                            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-5 priceTag2">{`$${item.price}`}</div>
                                        <div className="col-3" style={{fontSize: "large", paddingTop: "8px"}}>{item.source}</div>
                                        <div className="col-4 watchlistButtons">
                                            <AlertModal2 key={uuid()} item={item} alert={this.props.alert}/>
                                            
                                            <span><i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove(item)}>cancel</i></span>
                                            <ReactTooltip />
                                        </div>
                                </div>
                            </div>
                        </div>
                        )

                    // watchedItems.length > 0 ? watchedItems.map(item =>
                    //     <div className="container watchCard2">
                    //         <div className="row">
                    //             <div className="col s2 test1"></div>
                    //             <div className="col s6 test2"></div>                  
                    //         </div>
                    //     </div>
                    //     )

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
        addItemToWatch2: (item) => { dispatch(addItemToWatch2(item)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistRoute);