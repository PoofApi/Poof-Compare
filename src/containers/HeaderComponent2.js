import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';
import piggy3 from '../images/piggy3.jpg';
import {resetSearch} from '../actions/product';
import {store} from '../index.js';


class Header2 extends Component {
    constructor(props){
        super(props);


    } 

    returnHome(){
        store.dispatch(resetSearch());
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
                        <input className="browser-default search-field" style={{paddingLeft: "25px", width: "600px", height: "3.5vh"}} id="search" type="search"></input>
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