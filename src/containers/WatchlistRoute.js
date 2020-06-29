import React, {Component} from 'react';
import '../App.css' ;
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import 'react-rangeslider/lib/index.css';
import AlertModal from './AlertModal';
import { removeFromWatch, watch, logOutUser, addItemToWatch2 } from '../actions/product';
import MobileSignIn2 from './MobileSignIn2';
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


class WatchlistRoute extends Component {
    constructor(props){
        super(props);

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

        console.log(watchedItems);
        console.log(usersWatchedItems);
        console.log(storeUserId);

        return (
            <div className="watchlistRoutePage">
                <div className="watchlistContainerBar">
                    <div className="returnToSearchIcon"><Link to={'/'}><p data-tip={"Return to item search"} ><i className="material-icons keyboardReturnIcon">keyboard_return</i></p></Link></div>
                    <ReactTooltip />
                    <div>My Poof! Watchlist</div>
                    {storeUserId == "" ? <MobileSignIn2/> : <div className="logOutUserWatchRoute"><p data-tip={"Click to log out"} ><i className="material-icons WatchLogOutUserIcon" onClick={() => this.handleLogOut()}>perm_identity</i></p></div> }<ReactTooltip />
                </div>
                {/* <div className="returnToSearch">
                    <div className="returnTitle"><Link to={'/'}>Return to item search</Link></div>
                </div> */}
                {usersWatchedItems.length > 0 ? usersWatchedItems.map(item =>
                    <div className="container">
                        <div className="card mb-3" style={{maxWidth: "540px", height: "150px"}}>
                        <div className="row no-gutters">
                            <div className="col-2 col-md-4" style={{position: "relative", left: "5%", top: "3%"}}>
                                <img src={item.image} alt={item.title} key={item.id} style={{maxWidth: "100%", maxHeight: "60%"}}/>
                            </div> 
                            <div className="card-price" style={{position: "absolute", left: "8%", bottom: "10%", color: "tomato"}}>
                            <b>{item.price}</b>
                            </div>
                            <div className="col-8 col-md-8">
                            <div className="card-body watchRouteCard">
                                <h5 className="card-title watchRouteCardTitle" style={{ height:"3.5em" , fontSize:"16px"}}>{item.title}</h5>
                                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                <div className="card-text">
                                    
                                    <div className="row" style={{display: "flex", justifyContent: "flex-end"}}>
                                        {/* {this.props.user !== "" ?  */}
                                        
                                        <div style={{marginTop: "6.5px"}}>
                                            <AlertModal item={item} alert={this.props.alert}/>
                                        </div> 
                                        
                                        {/* :
                                        
                                        <div></div>
                                        
                                        } */}
                                        
                                        <div style={{position: "relative", right: "8%"}}>
                                        <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove(item)}>cancel</i>
                                        <ReactTooltip />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <div className="col-4 priceTag2">{item.price}</div>
                                        <div className="col-4" style={{paddingLeft: "40px", fontSize: "x-large"}}>{item.source}</div>
                                        <div className="watchlistButtons col-4">
                                            <i className="material-icons alertBtn" data-tip={"Add an alert for this item"}>add_alert</i>
                                            <ReactTooltip />

                                            <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.handleRemove(item)}>cancel</i>
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

                        <div style={{textAlign: "center", marginTop: "30px"}}>You have 0 items in your Poof! watch list.</div>}
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
        removeFromWatch : (item) => { dispatch(removeFromWatch(item)) },
        watch: (item) => { dispatch(watch(item)) },
        logOutUser: () => {dispatch(logOutUser())},
        addItemToWatch2: (item) => { dispatch(addItemToWatch2(item)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistRoute);