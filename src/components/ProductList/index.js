import React from 'react'
import {Product} from '../'

const ProductList = ({items, compare, watch}) =>
  <div className="productList" style={{paddingRight: "45px", paddingLeft: "100px"}}>
    <div className="row mt-3">
          {items.map((item, index) =>
            <Product key={index + 1} item={item} compare={compare} watch={watch}/>
          )}
      </div>
  </div>

export default ProductList
