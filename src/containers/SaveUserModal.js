import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import '../App.css';
import {saveUser, resetWatchList, addSignInWatch, setWatchList} from '../actions/product';
import {store} from '../index.js';

function resetWatch(){
    store.dispatch(resetWatchList());
}

class SaveUserModal extends Component {
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
        M.Modal.init(this.SaveUserModal, options);
    }

    
    render() {

        return (
            <div>
              <a
                className="btn modal-trigger newSaveBtn"
                data-target="modal4"
              >
                New Save
              </a>
      
              <div
                ref={SaveUserModal => {
                  this.SaveUserModal = SaveUserModal;
                }}
                id="modal4"
                className="modal"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center", color: "black"}}>
                    <h4>Save your list</h4>
                </div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Please enter your email or phone #" id="userId" type="text" className="validate" type="text" ref={(input) => {this.loginInput = input; }} onChange={this.handleChange} value={this.state.userId} required></input>
                                {/* <label for="userId">Please provide the email or phone number that your Poof! account is linked to.</label> */}

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

export default SaveUserModal;