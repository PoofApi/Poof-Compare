import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';
import piggy3 from '../images/piggy3.jpg';
import {store} from '../index.js';
import * as types from '../constants/types';
import Loading from './LoadingComponent.js';


const axios = require('axios');

//Part of getProductsForHome function
const getItems2 = (payload) => ({
    type: types.FETCH_PRODUCTS2,
    payload: payload
  })

//Previous code to fetch Eric's backend

// async function getProductsForHome(keywords){
//   console.log("Now fetching items.........")

//   try{
//     let response = await axios({
//       method: 'post',
//       url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
//       headers: {
//         "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
//         "Accept" : "application/json",
//         "Content-Type" : "application/json",
//       },
//       data: {"keywords" : keywords},
//     })
  
//     let items = await response.data;
//     console.log(items);
//     store.dispatch(getItems2(items.items));
//   }

//   catch(err){
//     alert(err);
//     console.log("An error occurred!!!!!: ", err);
//   }
// }

const getProducts3 = () =>

  alert("Get Products function called");
  
    fetch(`products.json`)
      .then(response => response.json())
      .then(response => {
        console.log(response.items);
        store.dispatch(getItems2(response.items))
      })

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleSubmit(event){
        getProducts3();
        this.setState({loading:true})
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    reload(){
        window.location.reload();
    }

    componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    render(){


        return (
            <div className="jumbo">
                <img src={piggy3} />
                <nav className="transparent">
                    <div className="nav-wrapper" style={{borderBottom: "1px solid"}}>
                        <a href="/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <div className="poofLogo" style={{paddingLeft: '15px'}}>
                            <Link style={{paddingRight: "20px", borderRight: "1px solid"}} to={'/'} className="brand-logo">Poof!</Link>
                        </div>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to={'/'}>About</Link></li>
                                <li><Link to={'/'}>Login</Link></li>
                                <li><Link to={'/'}>Register</Link></li>
                            </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li style={{textAlign: "center"}}><Link to={'/'}>About</Link></li>
                    <li style={{textAlign: "center"}}><Link to={'/'}>Login</Link></li>
                    <li style={{textAlign: "center"}}><Link to={'/'}>Register</Link></li>               
                </ul>
                <div className="row" style={{paddingTop: "180px", display: "flex", justifyContent: "center"}}>
                    <div className="col-12">
                        <h2 style={{textAlign: "center", fontSize: "60px", fontFamily: "Roboto"}} className="mb-3 flow-text white-text"><b>Welcome to Poof! Auto-Compare!</b></h2>
                    </div>
                    
                    {
                    this.state.loading ? 
                    
                        <div className="col-md-4">
                            <div style={{fontSize: "20px", color: "white", textAlign: "center"}}>
                                Just one moment while Poof! finds you the best deals!....
                            </div>
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                        </div>                   
                    
                    :
                
                    <div className="col-12 col-md-12" style={{display: "flex", justifyContent: "center"}}>
                        <form onSubmit={() => this.handleSubmit}>
                            <div className="input-field" style={{display: "flex", justifyContent: "center"}}>
                                <input className="browser-default search-field" style={{display: "flex", paddingLeft: "25px", width: "40vw", height: "6vh", marginTop: "20px"}} id="search" type="search" onChange={this.handleChange} value={this.state.value} required></input>
                                <label type="submit" value="Submit" style={{top:"45%", left:"95%"}} className="label-icon" for="search"><i style={{position:"absolute"}} className="material-icons">search</i></label>
                            </div>
                        </form>
                    </div>
                
                    }

                    <div className="col-12 col-md-12 categories" style={{marginTop: "15px", display: "flex", justifyContent: "center", fontFamily: "Roboto"}}>
                        <ul style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            <li className="laptopIcon" onClick={this.reload} style={{margin: "10px", padding: "20px", paddingLeft: "37px", paddingRight: "37px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">laptop_mac</i>
                                <div>Electronics</div>
                            </li>
                            <li className="bookIcon" onClick={this.reload} style={{margin: "10px", padding: "20px", paddingLeft: "44px", paddingRight: "44px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">book</i>
                                <div>Books</div>
                            </li>
                            <li className="houseIcon" onClick={this.reload} style={{margin: "10px", padding: "20px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">store</i>
                                <div>Clothes/Apparel</div>
                            </li>
                            <li className="toyIcon" onClick={this.reload} style={{margin: "10px", padding: "20px", paddingLeft: "30px", paddingRight: "30px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">toys</i>
                                <div>Games/Toys</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default Header;