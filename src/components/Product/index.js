import React from 'react';
import './styles.css';
import ReactTooltip from 'react-tooltip';


const Product = ({item, compare, watch}) =>
    <div className="col-sm-6 col-md-3">
        <div className={"product " + (item.compare ? "compare" : "")} >
            <img src={item.image} alt={item.title} />
            <div className="image_overlay"/>
            <div className="view_details" onClick={() => compare(item)}>
              {item.compare ? "Remove" : "Compare"}
            </div>
            <div className="stats">
                <div className="stats-container">
                    <span className="product_price">{item.price}</span>
                    <div className="buttonContainer" style={{display: "flex", justifyContent: "center", marginLeft: "50px"}}>
                        <p data-tip="Add to watchlist"><i className="material-icons watchButton" onClick={() => watch(item)}>remove_red_eye</i></p>
                        <ReactTooltip />
                    </div>
                    <span className="product_name" style={{position: "relative", bottom: "34px"}}>{item.title}</span>
                    <p>{item.short}</p>
                </div>
            </div>
        </div>
    </div>;

export default Product
