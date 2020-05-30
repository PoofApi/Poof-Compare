import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import {resetSearch, resetWatchList, logOutUser} from '../actions/product';
import {store} from '../index.js';
import * as types from '../constants/types';

const axios = require('axios');

//Part of getProductsForHome function
const getItems2 = (payload) => ({
    type: types.FETCH_PRODUCTS2,
    payload: payload
  })

//Previous code to fetch Eric's backend

async function getProductsForHome(keywords){
  console.log("Now fetching items.........")

  try{
    let response = await axios({
      method: 'post',
      url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
      headers: {
        "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      data: {"keywords" : keywords},
    })
  
    let items = await response.data;
    console.log(items);
    let storeWatch = store.getState().item.watchedItems;
    console.log(storeWatch);
    store.dispatch(getItems2(items.items));

  }

  catch(err){
    alert(err, "Please reload your browser");
    console.log("An error occurred!!!!!: ", err);
  }
}


class Header2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            value:'',
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    unWatchProducts(){
        let items = this.props.items;
        for (let k = 0; k < items.length; k++){
            items[k].watch = false;
        }
    }

    returnHome(){
        store.dispatch(resetSearch());
    }

    async resetWatch(){
        await this.unWatchProducts();
        store.dispatch(resetWatchList());
    }

    resetUser(){
        store.dispatch(logOutUser());
        alert("You have successfully logged out!")
    }

    async handleSubmit(event){
        
        this.setState({loading: true});

        try{
            await getProductsForHome(this.state.value);
            event.preventDefault();
            this.setState({loading: false});
            this.setState({value: ""});
        }
        catch(err){
            console.log(err);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    render(){
        return (
            <div className="jumbo2">
                <nav className="transparent">
                    <div className="nav-wrapper" style={{borderBottom: "1px solid"}}>
                        <a href="/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <div className="poofLogo">
                            <Link style={{paddingRight: "20px", paddingLeft: "15px", borderRight: "1px solid"}} to={'/'} className="brand-logo">Poof!</Link>
                        </div>
                        <div className="searchContainer row d-flex justify-content-center align-items-center">
                        <div className="spacer"></div>
                        {!this.state.loading ? 
                            
                            
                            <div className="searchBox col-sm-6 col-md-4">
                                <div>
                                    <form style={{marginLeft: "auto"}} onSubmit={this.handleSubmit}>
                                        <div className="input-field searchBox" >
                                            <input className="browser-default search-field" id="search" type="search" onChange={this.handleChange} value={this.state.value} required></input>
                                            {/* style={{paddingLeft: "50px", width: "600px", height: "3.5vh"}} */}
                                        </div>
                                    </form> 
                                    <div className="search2Btn" onClick={this.handleSubmit} >
                                        <i style={{position: "absolute", color: "black", top: "0", marginLeft: "10px"}} className="material-icons">search</i>
                                    </div>
                                </div>
                            </div>

                            :

                            <div className="progress progressBar" style={{width: "32%", marginRight: "300px"}}>
                                <div className="indeterminate indeterminateBar"></div>
                            </div>
                            
                        }    
                            
                        
                        <div className="navButtons" style={{marginLeft: "auto"}}>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li onClick={() => this.returnHome()} className="homeLink" >Home</li>
                                <li onClick={() => this.resetWatch()} className="resetLink" >Reset</li>                                
                                {this.props.user == "" ? <div></div> : <li onClick={() => this.resetUser()} className="resetUserLink" >Log Out</li>}                                
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/'}>About</Link></li>
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/'}>Login</Link></li>
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/'}>Register</Link></li>               
                </ul>
            </div>
            
        )
    }
}


export default Header2;