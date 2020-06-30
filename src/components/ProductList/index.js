import React from 'react';
import {Product} from '../';
import uuid from 'react-uuid';

const ProductList = ({items, compare, watch}) =>
  <div className="productList" style={{paddingRight: "45px", paddingLeft: "45px"}}>
    <div className="row mt-3">
          {items.map((item) =>
            <Product key={uuid()} item={item} compare={compare} watch={watch}/>
          )}
      </div>
  </div>

export default ProductList
