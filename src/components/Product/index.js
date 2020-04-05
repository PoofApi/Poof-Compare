import React from 'react'
import './styles.css'

const Product = ({item, compare}) =>
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
                    <span className="product_name">{item.title}</span>
                    <p>{item.short}</p>
                </div>
            </div>
        </div>
    </div>;

export default Product
