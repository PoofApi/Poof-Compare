import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';

class Header extends Component {

    componentDidMount(){
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    render(){
        return (
            <div className="jumbo">
                <nav className="transparent">
                    <div className="nav-wrapper">
                        <a href="/" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <div style={{paddingLeft: '15px'}}>
                            <Link to={'/'} className="brand-logo">Poof!</Link>
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
                <div className="row" style={{paddingTop: "180px"}}>
                    <div className="col-12">
                        <h2 style={{textAlign: "center", fontSize: "32px", textDecoration: "underline"}} className="mb-3 flow-text white-text"><b>Welcome to Poof! Auto-Compare!</b></h2>
                        </div>
                    <div className="col-12 col-md-8 offset-md-2" style={{display: "flex", justifyContent: "center"}}>
                        <form>
                            <div className="input-field" style={{display: "flex"}}>
                            <input style={{paddingLeft: "50px"}} id="search" type="search" required></input>
                            <label style={{marginLeft: 0, paddingRight: "20px"}} className="label-icon" for="search"><i className="material-icons prefix">search</i></label>
                            <i style={{paddingLeft: "23px", marginRight: 0}} className="material-icons prefix">close</i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default Header;