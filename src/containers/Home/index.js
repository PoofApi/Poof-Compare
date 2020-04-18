import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Compare, ProductList} from '../../components'
import * as productActions from '../../actions/product'
import {connect} from 'react-redux';
import Header from '../HeaderComponent.js';
import Header2 from '../HeaderComponent2.js';
import Loading from '../LoadingComponent.js';
import './styles.css';
import {store} from '../../index.js';


const axios = require('axios');

//Part of previous code that used Eric's backend

// async function getItems(){
//   console.log("Now fetching items.........")

//   try{
//     let response = await axios({
//       method: 'post',
//       url: "https://us-central1-poofapibackend.cloudfunctions.net/search-bestprice",
//       headers: {
//         "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
//         "Accept" : "application/json",
//         "Content-Type" : "application/json",
//       },
//       data: {"keywords" : "gamecube controller"},
//     })
  
//     let items = await response.data;
//     console.log(items);
//   }

//   catch(err){
//     alert(err);
//     console.log("An error occurred!!!!!: ", err);
//   }
// }

class Home extends Component {

  componentDidUpdate() {
    console.log(this.props);
    console.log(this.state);
    console.log(store.getState().item.isLoading);
  }

  render() {

    // getItems();
    
    const {items, actions, isLoading} = this.props;
    const compareProducts = items.filter(item => item.compare);
    console.log(this.props.items);
    console.log(this.props.isLoading);

    return (
      
      <div>

        {this.props.items.length > 0 ? <Header2 /> : 
        <div>
          <Header />
          
        </div>
        }
        {this.props.items.length > 0 && 
          <div className="resetButton" onClick={() => this.props.actions.resetSearch()} style={{cursor: "pointer", borderColor: "black", zIndex: "99", border: "2px solid", position: "fixed", top: "11%", right: "2%", marginLeft: "10px", marginTop: "10px", backgroundColor: "pink", padding: "5px", fontWeight: "770"}}>
            <div style={{float:"right"}}>
              Click to Reset Search
            </div>
          </div>
        }
        
        {this.props.items.length > 0 && 
          <div className="home mt-5">
            <ProductList items={items} compare={actions.compare}/>
            <div className="compareTable">
              {compareProducts.length >= 1 &&
                <Compare items={compareProducts}/>
              }
           </div>
            
          </div>
          
        }
        
      </div>
     
    )
  }
}

export default connect(
  state => ({
    items: state.item.items
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home)
