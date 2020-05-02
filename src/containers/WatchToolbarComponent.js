import React, {Component} from 'react';
import '../App.css';

class WatchToolbar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="watchtool-container">
                <i className="material-icons toggle-watchtoolbar" onClick={() => this.props.toggleClick()} >chevron_left</i>
            </div>
        )
    }
}

export default WatchToolbar;