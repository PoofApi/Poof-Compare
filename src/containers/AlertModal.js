import React, { Component } from "react";
import M from "materialize-css";
import {auth} from '../firebase.js';
import '../App.css';
import {saveUser, resetWatchList} from '../actions/product';
import {store} from '../index.js';
import ReactTooltip from 'react-tooltip';
import VolumeSlider from "./VolumeSliderComponent.js";

function resetWatch(){
    store.dispatch(resetWatchList());
}

class AlertModal extends Component {

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

    unWatchProducts(){
        let items = this.props.products;
        for (let k = 0; k < items.length; k++){
            items[k].watch = false;
        }
    }

    async handleSubmit() {
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

              <i className="material-icons alertBtn modal-trigger" data-target="modal1" data-tip={"Add an alert for this item"} >add_alert</i>
              <ReactTooltip />
      
              <div
                ref={Modal3 => {
                  this.Modal3 = Modal3;
                }}
                id="modal1"
                className="modal alertModal"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center"}}>
                    <h4>Set an alert for "{this.props.item.title}"</h4>
                </div>
                <div className="row">
                    <VolumeSlider />
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s11" style={{marginTop: "20px"}}>
                                <input id="userId" type="text" className="validate" style={{paddingLeft: "30px"}} onChange={this.handleChange} value={this.state.userId} required></input>
                                <label style={{textAlign: "center"}} for="userId">Please provide a target price for your item.</label>
                            </div>
                        </div>
                        <div className="row" style={{display:"flex", justifyContent: "center", marginRight: "30px"}}>
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

export default AlertModal;