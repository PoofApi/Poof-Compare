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
            targetPrice: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({targetPrice: event.target.value});
    }

    unWatchProducts(){
        let items = this.props.products;
        for (let k = 0; k < items.length; k++){
            items[k].watch = false;
        }
    }

    async handleSubmit() {
        const product = this.props.item;
        const price = this.state.targetPrice;
        this.props.alert(price, product);
    }

    handleSubmit2(itemTitle) {
        setTimeout(() => {alert(`Thank you! You have successfully submitted an alert for ${itemTitle}! You will be notified if/when your item reaches your target price.`);}, 3000)
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
        M.Modal.init(this.AlertModal, options);
        
    }

    retrieveValue = (value) => {
        this.setState({targetPrice: value});
    }

    
    render() {

        return (
            <div>

              <i className="material-icons alertBtn modal-trigger" data-target={`${this.props.item.title}`} data-tip={"Add an alert for this item"} >add_alert</i>
              <ReactTooltip />
      
              <div
                ref={AlertModal => {
                  this.AlertModal = AlertModal;
                }}
                id={`${this.props.item.title}`}
                className="modal alertModal"
              >
              <div className="modal-content">
                <div className="headerContainer" style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                    <div>
                        <h4 style={{textAlign: "center"}}><b>Set an alert (i.e. target price) for "{this.props.item.title}"</b></h4>
                    </div>
                    <div className="priceContainer" style={{textAlign: "center"}}>
                        <h6>(Lowest available price is currently: {`$${this.props.item.price}`})</h6>
                    </div>
                </div>
                <div className="row">
                    <VolumeSlider getValue={this.retrieveValue}/>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s3 m3" style={{marginTop: "20px"}}>
                                <input id="userId" type="text" className="validate alertInput alertInput" style={{paddingLeft: "30px"}} onChange={this.handleChange} value={this.state.targetPrice} required></input>
                                {/* <label style={{textAlign: "center", paddingRight: "100px"}} for="userId">Please provide a target price for your item.</label> */}
                            </div>
                        </div>
                        <div className="row" style={{display:"flex", justifyContent: "center", marginRight: "70px"}}>
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