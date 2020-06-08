import React from 'react';
import './highlightCSS.css';

const Compare = ({items, toggleClick}) =>
  <div className="highlightContainer">
    <div className="hToolbar">
        <i className="material-icons toggleButton" onClick={() => toggleClick()} >expand_more</i>
    </div>
        {items.map(item =>
            <div className="watchContainer">
              <div className="row">
                <div className="col-3 comparePicHolder">
                  <img className="img-fluid compareImage" src={item.image} alt={item.title} key={item.id}/>
                </div>
                <div className="col-7 info">
                  <div className="itemName">
                      <h3 className='username itemName2'>{item.title}</h3>
                  </div>
                  {/* <div className="fillerContent">
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
                  </div> */}
                </div>
              </div>
              <div className="row">
                <div className="col-4 itemPrice">{item.price}</div>
                <div className="col-7 itemSource">Source: {item.source}</div>
              </div>
              <div className="row">
                <div className="col-12 itemLink" style={{textAlign: "center"}}>{item.link}</div>
              </div>
            </div>
        )}
  </div>;

export default Compare
