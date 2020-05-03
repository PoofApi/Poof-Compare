import React from 'react';
import './styles.css';
import ReactTooltip from 'react-tooltip';


const Product = ({item, compare, watch}) =>
    <div className="col-sm-6 col-md-3">
        <div className={"product " + (item.compare ? "compare" : "")} >
            <img style={{width: "100%", height: "400px"}} src={item.image} alt={item.title} />
            <div className="image_overlay"/>
            <div className="view_details" onClick={() => compare(item)}>
              {item.compare ? "Remove" : "Compare"}
            </div>
            <div className="stats">
                <div className="stats-container">
                    <span className="product_price">{item.price}</span>
                    <div className="buttonContainer" style={{display: "flex", justifyContent: "center", marginLeft: "60px"}}>
                        <p data-tip={(item.watch? "Remove from watchlist" : "Add to watchlist")} ><i className="material-icons watchButton" style={{color: (item.watch ? "darkgoldenrod" : "black")}} onClick={() => watch(item)}>remove_red_eye</i></p>
                        <ReactTooltip />
                    </div>
                    <div className="name-container" style={{display: "flex", textAlign: "center", marginLeft: "50px"}}>
                        <span className="product_name" style={{position: "relative"}}>{item.title}</span>
                    </div>
                    {/* Previous line to allow for short details about the product */}
                    {/* <p style={{position:"relative", top: "10px"}}>{item.short}</p> */}
                </div>
            </div>
        </div>
    </div>;

export default Product
