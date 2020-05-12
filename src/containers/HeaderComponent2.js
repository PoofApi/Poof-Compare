import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import {resetSearch} from '../actions/product';
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

    returnHome(){
        store.dispatch(resetSearch());
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
                        <div className="searchContainer">
                            
                        {!this.state.loading ? 

                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field searchBox" style={{display: "flex", justifyContent: "center"}}>
                                    <input className="browser-default search-field" style={{paddingLeft: "25px", width: "600px", height: "3.5vh"}} id="search" type="search" onChange={this.handleChange} value={this.state.value} required></input>
                                </div>
                            </form> 

                            :

                            <div className="progress" style={{width: "39%"}}>
                                <div className="indeterminate"></div>
                            </div>
                            
                        }    
                            
                        <div className="linksContainer">
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li onClick={() => this.returnHome()} className="homeLink" >Home</li>
                                <li className="navLinks"><Link to={'/'}>Login</Link></li>
                                <li className="navLinks"><Link to={'/'}>Register</Link></li>
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