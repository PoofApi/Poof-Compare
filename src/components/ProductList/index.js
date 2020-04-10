import React from 'react'
import {Product} from '../'

const ProductList = ({items, compare}) =>
  <div className="productList" style={{paddingRight: "45px", paddingLeft: "45px"}}>
    <div className="row mt-3">
          {items.map((item, index) =>
            <Product key={index + 1} item={item} compare={compare} />
          )}
      </div>
  </div>

export default ProductList
