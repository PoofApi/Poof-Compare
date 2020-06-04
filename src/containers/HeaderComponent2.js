import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import {resetSearch, resetWatchList, logOutUser} from '../actions/product';
import {store} from '../index.js';
import * as types from '../constants/types';
import poofWithBackground from '../images/poofWithBackground.jpg';

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

        var urlName = window.location.pathname;

        if (urlName !== "/watchlist" ){
            let sidenav = document.querySelector('#slide-out');
            M.Sidenav.init(sidenav, {});
        }
    }

    render(){
        
        return (
                <div className="newNavBar" style={{borderBottom: "1px solid", display: "flex", position: "fixed", justifyContent: "space-between", alignItems: "center", backgroundColor: "#0C1344"}}>
                    {/* <a href="#!" className="brand-logo poofLogo2">Poof!</a>
                    <a href="/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
                    
                    <div className="poofLogo">
                        <Link className="newPoofLogo" to={'/'}>Poof!</Link>
                    </div>
                    <div className="poofPic">
                        <img src={poofWithBackground} alt="poofPicture" style={{width: "80px", marginBottom: "5px"}}/>
                    </div>
                    {!this.state.loading ? 
                        
                        // Previous searchbar using materialize-css

                        // <div className="searchBox col-sm-6 col-md-4">
                        //     <div>
                        //         <form style={{marginLeft: "auto"}} onSubmit={this.handleSubmit}>
                        //             <div className="input-field searchBox" >
                        //                 <input className="browser-default search-field" id="search" type="search" onChange={this.handleChange} value={this.state.value} required></input>
                        //                 {/* style={{paddingLeft: "50px", width: "600px", height: "3.5vh"}} */}
                        //             </div>
                        //         </form> 
                        //         <div className="search2Btn" onClick={this.handleSubmit} >
                        //             <i style={{position: "absolute", color: "black", top: "0", marginLeft: "10px"}} className="material-icons">search</i>
                        //         </div>
                        //     </div>
                        // </div>
                            <div className="searchboot col-sm-6 col-md-4">
                                <form className="form-inline" onSubmit={this.handleSubmit}>
                                    <div style={{backgroundColor: "white", borderRadius: "5px"}} className="input-group inputBox">
                                        <input id="search" type="search" onChange={this.handleChange} value={this.state.value} required className="form-control searchboot2" placeholder="Search Item" aria-label="Search Item" aria-describedby="basic-addon1"></input>
                                        <div className="input-group-prepend" onClick={this.handleSubmit}>
                                            <span className="input-group-text" style={{paddingLeft: "20px"}} id="basic-addon1"><i style={{position:"absolute", right: "3px"}} className="material-icons">search</i></span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        :

                        <div className="progress progressBar col-sm-12 col-md-3">
                            <div className="indeterminate indeterminateBar"></div>
                        </div>
                        
                    }    
                        
                    {/* <span className="search2Btn" onClick={this.handleSubmit} >
                        <i style={{position: "absolute", color: "black", top: "0", marginLeft: "10px"}} className="searchSign material-icons">search</i>
                    </span> */}

                    
                    <div className="logOutBtn">
                        <ul>
                            {/* <li onClick={() => this.returnHome()} className="homeLink" >Home</li>
                            <li onClick={() => this.resetWatch()} className="resetLink" >Reset</li>*/}
                            {this.props.user == "" ? <div></div> : <li onClick={() => this.resetUser()} className="resetUserLink" >Log Out</li>}                                
                        </ul>
                    </div>
                </div>
                

                /* <ul id="slide-out" className="sidenav">
                    <li className="navLinks sidenavPoof" style={{textAlign: "center"}}><Link style={{fontSize: "xx-large", color: "white", paddingTop: "8px"}} to={'/'}>Poof!</Link></li>
                    
                    {!this.state.loading ? 
                    
                    <div className="searchBox2 col-sm-12">
                        <div className="searchboot3">
                            <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div style={{backgroundColor: "white", borderRadius: "5px"}} className="input-group inputBox2">
                                    <input id="search" type="search" onChange={this.handleChange} value={this.state.value} required className="form-control searchboot4" placeholder="Search Item" aria-label="Search Item" aria-describedby="basic-addon1"></input>
                                    <div className="input-group-prepend" onClick={this.handleSubmit}>
                                        <span className="input-group-text" id="basic-addon1"><i className="material-icons">search</i></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    :

                    <div className="progress progressBar2">
                        <div className="indeterminate indeterminateBar"></div>
                    </div>
                    
                    }
                    
                    
                    <li onClick={() => this.returnHome()} className="navLinks sidenavHome" style={{textAlign: "center"}}><Link to={'/'}>Home</Link></li>
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/watchlist'}>My Poof! Watch List</Link></li>
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/'}>Reset List</Link></li>
                    <li className="navLinks" style={{textAlign: "center"}}><Link to={'/'}>Log Out</Link></li>               
                </ul> */
            
        )
    }
}


export default Header2;