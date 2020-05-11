import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import '../App.css';
import {saveUser} from '../actions/product';
import {store} from '../index.js';

class Modal3 extends Component {

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

    handleSubmit() {
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
        M.Modal.init(this.Modal3, options);
        
    }

    
    render() {

        return (
            <div>
              <a
                className="btn modal-trigger"
                data-target="modal1"
              >
                Login
              </a>
      
              <div
                ref={Modal3 => {
                  this.Modal3 = Modal3;
                }}
                id="modal1"
                className="modal"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center"}}>
                    <h4>Save Poof! Watchlist</h4>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="userId" type="text" className="validate" onChange={this.handleChange} value={this.state.userId} required></input>
                                <label for="userId">Please provide an email or a phone number to link your Poof! watchlist to.</label>
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

export default Modal3;