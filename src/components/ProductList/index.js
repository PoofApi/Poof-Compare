import React from 'react'
import {Product} from '../'

const ProductList = ({products, compare}) =>
  <div className="row mt-3">
      {products.map((product, index) =>
        <Product key={index} product={product} compare={compare} />
      )}
  </div>;

export default ProductList
