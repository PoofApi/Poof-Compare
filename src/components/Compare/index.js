import React from 'react';
import './highlightCSS.css';

const Compare = ({items, toggleClick}) =>
  <div className="highlightContainer">
    <div className="hToolbar">
        <i className="material-icons toggleButton" onClick={() => toggleClick()} >expand_more</i>
    </div>
    <div className="imageContainer">
        {items.map(item =>
          <img className="compareImage" src={item.image} alt={item.title} key={item.id}/>
        )}
    </div>
    <div className="info">
      <h3 className='username'>Item Crap</h3>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
        <p className='comment'>Aptent vel egestas vestibulum aliquam ullamcorper volutpat
        ullamcorper pharetra hac posuere a rhoncus purus molestie torquent. Scelerisque
        purus cursus dictum ornare a phasellus. A augue venenatis adipiscing.</p>
    </div>
  </div>;

export default Compare
