import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import '../../App.css';
import {Home, NotFound} from '../';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";


class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
