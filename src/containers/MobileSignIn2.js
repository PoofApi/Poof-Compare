import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import '../App.css';
import {saveUser, resetWatchList, addSignInWatch, setWatchList} from '../actions/product';
import {store} from '../index.js';
import ReactTooltip from 'react-tooltip';

function resetWatch(){
    store.dispatch(resetWatchList());
}

class MobileSignIn2 extends Component {

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

    handleSubmit() {
        // let items = this.props.userItems;
        // items.map( item => setWatchList(item));
        // this.unWatchProducts();
        // resetWatch();
        store.dispatch(saveUser(this.state.userId));
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
        M.Modal.init(this.MobileSignIn2, options);
        
    }

    
    render() {

        return (
            <div className="mobileRouteLogin">
              <div className="loadListIcon modal-trigger" data-target="modal3"><p data-tip={"Load previously saved list"}><i className="material-icons">import_contacts</i></p></div>
                <ReactTooltip />
              <div
                ref={MobileSignIn2 => {
                  this.MobileSignIn2 = MobileSignIn2;
                }}
                id="modal3"
                className="modal signUpUser"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center"}}>
                    <h4>Load your saved list</h4>
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

export default MobileSignIn2;