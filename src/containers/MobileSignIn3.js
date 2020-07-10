import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import '../App.css';
import {saveUser, resetWatchList, addSignInWatch, setWatchList, removeFromWatch, watch, logOutUser, addItemToWatch2} from '../actions/product';
import {store} from '../index.js';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
const axios = require('axios');


function resetWatch(){
    store.dispatch(resetWatchList());
}

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

class MobileSignIn3 extends Component {

    constructor(props){
        super(props);

        this.state={
            userId: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({userId: event.target.value});
    }

    // unWatchProducts(){
    //     let items = this.props.products;
    //     for (let k = 0; k < items.length; k++){
    //         items[k].watch = false;
    //     }
    // }

    async handleSubmit() {
        // let items = this.props.userItems;
        // items.map( item => setWatchList(item));
        // this.unWatchProducts();
        // resetWatch();
        this.props.saveUser(this.state.userId);
        window.location.reload(false);
        // console.log(this.props.storeUserId);
        // if(this.props.storeUserId !== ""){
        //     let signedUserItems = await getWatchList(this.props.storeUserId);
        //     console.log(signedUserItems);
        //     if(signedUserItems){
        //         signedUserItems.map(item => this.props.addItemToWatch2(item));
        //     }
        // }
    }

    componentDidMount() {
        const options = {
        onOpenStart: () => {
            console.log("Open Start");
        },
        onOpenEnd: () => {
            console.log("Open End");
        },
        onCloseStart: () => {
            console.log("Close Start");
        },
        onCloseEnd: () => {
            console.log("Close End");
        },

        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: true,
        startingTop: "4%",
        endingTop: "10%"
        };
        M.Modal.init(this.MobileSignIn3, options);
        
    }

    
    render() {

        return (
            <div className="mobileRouteLogin2">
              <div className="loadListIcon modal-trigger" data-target="modal4"><p data-tip={"Load previously saved list"}><i className="material-icons desktopLoadWatchlist2">perm_identity</i></p></div>
                <ReactTooltip />
              <div
                ref={MobileSignIn3 => {
                  this.MobileSignIn3 = MobileSignIn3;
                }}
                id="modal4"
                className="modal desktopSignUp"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center"}}>
                    <h3 className="modalTitle2">Load your saved list</h3>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="userId" type="text" className="mobileInput validate" onChange={this.handleChange} value={this.state.userId} required></input>
                                <label for="userId">Please provide the email or phone number that your Poof! account is linked to.</label>
                            </div>
                        </div>
                        <div className="row" style={{display:"flex", justifyContent: "center"}}>
                            <div >
                                <a onClick={this.handleSubmit} className="btn submit-button modal-close" style={{marginRight: "20px"}}>Submit</a>
                            </div>
                            <div>
                                <a className="btn close-button modal-close">Close</a>
                            </div>
                        </div>
                    </form>
                </div>
              </div>
              </div>
            </div>
              

          );
    }
}

const mapStateToProps = (state) => {
    return {
        storeUserId: state.item.storeUserId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromWatch : (item) => { dispatch(removeFromWatch(item)) },
        watch: (item) => { dispatch(watch(item)) },
        logOutUser: () => {dispatch(logOutUser())},
        addItemToWatch2: (item) => { dispatch(addItemToWatch2(item)) },
        saveUser: (user) => { dispatch(saveUser(user)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileSignIn3);