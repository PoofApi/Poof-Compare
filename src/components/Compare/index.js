import React from 'react';
import './highlightCSS.css';
import uuid from 'react-uuid';

const Compare = ({items, toggleClick}) =>
  <div className="highlightContainer">
    <div className="hToolbar">
        <i className="material-icons toggleButton" onClick={() => toggleClick()} >expand_more</i>
    </div>
        {items.map(item =>
            <div className="watchContainer" key={uuid()}>
              <div className="row">
                <div className="col-3 col-md-3 comparePicHolder">
                  <img className="img-fluid compareImage" src={item.image} alt={item.title} key={item.id}/>
                </div>
                <div className="col-7 col-md-8 info">
                  <div className="itemName">
                      <h3 className='username itemName2'>{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 priceTag">{`$${item.price}`}</div>
                <div className="col-4 col-md-4 itemSource">
                  <a href={`${item.link}`} target="_blank" className="compareSourceLogo"><img className={"img-fluid" + (item.logo == "https://firebasestorage.googleapis.com/v0/b/poofapibackend.appspot.com/o/icons%2Fbestbuy.png?alt=media&token=da783e57-802f-4a40-b609-3af1fd78098a" ? " compareBestBuyLogo" : " compareSourceLogoPic")} src={item.logo} alt={item.title}/></a>                
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12 itemLink" style={{textAlign: "center"}}>{item.link}</div>
              </div> */}
            </div>
        )}
  </div>;

export default Compare
