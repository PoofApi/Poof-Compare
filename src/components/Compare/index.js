import React from 'react'
import './styles.css'

const Compare = ({items}) =>
  <div className="row compare">
    <div className="col-12 mt-5 text-center">
      <table className="table">
        <thead className="thead-default">
          <tr>
            <th />
            {items.map(item =>
              <th key={item.id}>
                {item.title}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="price">
            <th scope="row">Price</th>
            {items.map(item =>
              <td key={item.id} className="text-center">{item.price}</td>
            )}
          </tr>
          <tr className="condition">
            <th scope="row">Condition</th>
            {items.map(item =>
              <td key={item.id} className="text-center">{item.condition}</td>  
            )}
          </tr>
          <tr className="source">
            <th scope="row">Source</th>
            {items.map(item =>
              <td key={item.id} className="text-center">{item.source}</td>  
            )}
          </tr>
          <tr className="link">
            <th scope="row">Link</th>
            {items.map(item =>
              <td key={item.id} className="text-center">{item.link}</td>  
            )}
          </tr>
        </tbody>
      </table>
    </div>
  </div>;

export default Compare
