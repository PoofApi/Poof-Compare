import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';
import piggy3 from '../images/piggy3.jpg';
import {resetSearch} from '../actions/product';

const showState = () => {
    console.log("showState function was called!")
    alert(this.state);
}

class Header2 extends Component {

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
                        <div className="poofLogo" style={{paddingLeft: '15px'}}>
                            <Link style={{paddingRight: "20px", borderRight: "1px solid"}} to={'/'} className="brand-logo">Poof!</Link>
                        </div>
                            <ul id="nav-mobile" className="left hide-on-med-and-down" style={{paddingLeft: "120px"}} onClick={() => resetSearch()}>
                                <li><Link to={'/'}>Reset Search</Link></li>
                            </ul>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to={'/'}>About (Items are loaded)</Link></li>
                                <li><Link onClick={showState()} to={'/'}>About (Items are loaded)</Link></li>
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
            </div>
            
        )
    }
}


export default Header2;