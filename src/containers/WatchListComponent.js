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
                <div className="watchlist-navbar" style={{height: "30px", backgroundColor: "black", position: "fixed", width: "100%"}}>
                    <i className="material-icons toggle-watchlist" onClick={() => this.props.toggleClick()} >chevron_right</i>
                </div>

                <div className="watchContainer2">
                    {this.props.items.map(item =>
                        <div>
                                <img className="watchImage" src={item.image} alt={item.title} key={item.id}/>
                        </div>
                    )}
                </div>

                <div className="save-container">
                    <a className="btn saveWatch" onClick={() => this.props.saveClick()}>Save List</a>
                </div>
            </div>
        )
    }
    
}

export default WatchList;