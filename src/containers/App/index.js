import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import '../../App.css';
import {Home, NotFound} from '../';
import WatchlistRoute from '../WatchlistRoute.js';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";


class App extends Component {

  removeOverlay(){
  
    let urlName = window.location.pathname;

    if (urlName === "/watchlist"){
      var overlay = document.querySelector(".sidenav-overlay"); 
      console.log(overlay)
      if(Array.isArray(overlay)){
        overlay.forEach(ele => 
          ele.style.display = "none"
        )
      } else{
        overlay.style.display = "none"
      }
    }
    
  }

  componentDidUpdate(){
    this.removeOverlay();
  }

  render() {

    return (
      <div className="app">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/watchlist" component={WatchlistRoute} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
