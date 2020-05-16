import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Compare, ProductList} from '../../components'
import * as productActions from '../../actions/product'
import {connect} from 'react-redux';
import Header from '../HeaderComponent.js';
import Header2 from '../HeaderComponent2.js';
import CompareToolbar from '../compareToolbar.js';
import WatchList from '../WatchListComponent.js';
import WatchToolbar from '../WatchToolbarComponent.js';
import Loading from '../LoadingComponent.js';
import './styles.css';
import {store} from '../../index.js';


const axios = require('axios');

// Part of previous code that used Eric's backend

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

async function setWatchList(item){

  try{
    let response = await axios({
      method: 'post',
      url: "https://us-central1-poofapibackend.cloudfunctions.net/watchList-setWatchlistItem",
      headers: {
        "Authorization": "Bearer b99d951c8ffb64135751b3d423badeafac9cfe1f54799c784619974c29e277ec",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      },
      data: {
          "userId" : store.getState().item.storeUserId,
          "title" : item.title,
          "itemUrl" : item.link,
          "price" : item.price,            
      },
    })
  
    let confirmation = await response.data;
    console.log("Successfully added item to firebase watchlist!: ", confirmation, item.title);
  }

  catch(err){
    console.log(err, "Unable to set items into watchlist");
  }
}

class Home extends Component {
  
  state = {
    compareTableOpen: true,
    compareToolbarOpen: false,
    watchListOpen: true,
    watchToolbarOpen: false,
    watchItemsState: this.props.items.filter(item => item.watch)
  };

  toggleCompare = () => {
    this.toggleCompareToolbar();
    this.setState((prevState) => {
      return {compareTableOpen: !prevState.compareTableOpen};
    })
  };

  toggleCompareToolbar = () => {
    this.setState({compareTableOpen: true});
    this.setState((prevState) => {
      return {compareToolbarOpen: !prevState.compareToolbarOpen};
    })
  };

  closeWatchList = () => {
    this.setState({watchListOpen: false});
    this.setState({watchToolbarOpen: true});
  };

  toggleWatchToolbar = () => {
    this.setState({watchListOpen: true});
    this.setState({watchToolbarOpen: false});
  }

  saveList = () => {
    const watchItems = this.props.items.filter(item => item.watch);
    console.log("User's current watchlist: ", watchItems);
  }

  compareLists(items, storeWatchItems){
    for (let k = 0; k < storeWatchItems.length; k++){
      let watchItemName = storeWatchItems[k].title;

      for (let j=0; j < items.length; j++){
        let itemName = items[j].title;
        if (itemName == watchItemName){
          items[j].watch = true;
        }
      }
    }
  }

  componentDidUpdate(){
    const products = this.props.items;
    const storeWatch = this.props.watchedItems;
  
    this.compareLists(products, storeWatch);
  }

  render() {

    // getItems();
    
    const {items, actions, isLoading, watchedItems} = this.props;
    const compareProducts = items.filter(item => item.compare);
    const storeWatchProducts = watchedItems;
    const overlapWatch = this.compareLists(items, storeWatchProducts);

    console.log(overlapWatch);


    return (
      
      <div>

    {this.props.items.length > 0 ? <div><Header2 /> {storeWatchProducts.length > 0 && (this.state.watchListOpen) ? <WatchList items={storeWatchProducts} toggleClick={this.closeWatchList} saveClick={this.saveList} watch={actions.watch} /> : <div></div>} {storeWatchProducts.length > 0 && (!this.state.watchListOpen) ? <WatchToolbar toggleClick={this.toggleWatchToolbar} /> : <div></div> } </div>: 
        <div>
          <Header />
        </div>
        }

        {/* Previous "Reset Button" used to return home and reset search items */}
        {/* {this.props.items.length > 0 && 
          <div className="resetButton" onClick={() => this.props.actions.resetSearch()} style={{cursor: "pointer", borderColor: "black", zIndex: "99", border: "3px solid white", position: "fixed", top: "11%", right: "2%", marginLeft: "10px", marginTop: "10px", backgroundColor: "black", padding: "5px", fontWeight: "770", color: "white", borderRadius: "10px"}}>
            <div style={{float:"right"}}>
              Click to Reset Search
            </div>
          </div>
        } */}
        
        {this.props.items.length > 0 && 
        <div className="productHome">
          <div className="home mt-5">
            <ProductList items={items} compare={actions.compare} watch={actions.watch}/>
            <div className="compareTable">
              {compareProducts.length >= 1 && (this.state.compareTableOpen) ? 
                <Compare items={compareProducts} toggleClick={this.toggleCompare} 
              />

              :

              <div></div> }
           </div>

           {this.state.compareToolbarOpen && compareProducts.length >= 1 ? <CompareToolbar toggleToolbar={this.toggleCompareToolbar} /> : <div></div> }
          </div>
        </div>
        }
      </div>
     
    )
  }
}

export default connect(
  state => ({
    items: state.item.items,
    watchedItems: state.item.watchedItems
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home)
