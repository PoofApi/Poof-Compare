import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import '../App.css';
import Modal from './Modal.js';
import Modal2 from './Modal2.js';
import piggy3 from '../images/piggy3.jpg';

class Header2 extends Component {

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
                                <li><Link to={'/'}>About (Items are loaded)</Link></li>
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
                        <h2 style={{textAlign: "center", fontSize: "60px", fontFamily: "Roboto"}} className="mb-3 flow-text white-text"><b>Welcome to Poof! Auto-Compare!</b></h2>
                        </div>
                    <div className="col-12 col-md-12" style={{display: "flex", justifyContent: "center"}}>
                        <form>
                            <div style={{display: "flex", justifyContent: "center"}}>
                            <input className="browser-default search-field" style={{display: "flex", width: "40vw", height: "6vh", marginTop: "20px"}} id="search" type="search" required></input>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-md-12 categories" style={{marginTop: "15px", display: "flex", justifyContent: "center", fontFamily: "Roboto"}}>
                        <ul style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            <li style={{margin: "10px", padding: "20px", paddingLeft: "37px", paddingRight: "37px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">laptop_mac</i>
                                <div>Electronics</div>
                            </li>
                            <li style={{margin: "10px", padding: "20px", paddingLeft: "44px", paddingRight: "44px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">book</i>
                                <div>Books</div>
                            </li>
                            <li style={{margin: "10px", padding: "20px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
                            <i className="medium material-icons">store</i>
                                <div>Clothes/Apparel</div>
                            </li>
                            <li style={{margin: "10px", padding: "20px", paddingLeft: "30px", paddingRight: "30px", textAlign: "center", borderRadius: "5px", border: "3px solid", color: "white"}}>
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


export default Header2;