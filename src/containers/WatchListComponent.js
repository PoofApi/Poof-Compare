import React, {Component} from 'react';
import '../App.css';

class WatchList extends Component {
    constructor(props){
        super(props);

        this.state= {
            watchItems: []
        }
    }

    render(){
        return(
            <div className="watchlist-container">
                <i className="material-icons toggle-watchlist" onClick={() => this.props.toggleClick()} >chevron_right</i>

                {this.props.items.map(item =>
                    <div>
                            <img className="watchImage" src={item.image} alt={item.title} key={item.id}/>
                    </div>
                )}
            </div>
        )
    }
    
}

export default WatchList;