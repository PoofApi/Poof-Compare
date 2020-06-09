import React, {Component} from 'react';
import '../App.css' ;
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import 'react-rangeslider/lib/index.css';
import AlertModal from './AlertModal';

class WatchlistRoute extends Component {
    constructor(props){
        super(props);

    }

    // removeOverlay(){
        
    //     var overlay = document.getElementById("sidenav-overlay");
        
    //     if(overlay){
    //         overlay.style.display = "none";
    //     }
    // }

    // componentDidMount(){
    //     this.removeOverlay();
    // }

    render(){

        const { watchedItems, usersWatchedItems } = this.props;

        return (
            <div className="watchlistRoutePage">
                <div className="watchlistContainerBar">
                        My Poof! Watchlist
                </div>
                <div className="returnToSearch">
                    <div className="returnTitle"><Link to={'/'}>Return to item search</Link></div>
                </div>
                {usersWatchedItems.length > 0 ? usersWatchedItems.map(item =>
                    <div className="container">
                        <div className="card mb-3" style={{maxWidth: "540px", height: "150px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4" style={{position: "relative", left: "5%", top: "3%"}}>
                            <img src={item.image} alt={item.title} key={item.id} style={{maxWidth: "100%", maxHeight: "60%"}}/>
                            </div> 
                            <div className="card-price" style={{position: "absolute", left: "14%", bottom: "10%", color: "tomato"}}>
                            <b>{item.price}</b>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title" style={{ height:"3.5em" , fontSize:"18px", overflow:"hidden"}}>{item.title}</h5>
                                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                <div className="card-text">
                                    
                                    <div className="row" style={{display: "flex", justifyContent: "flex-end"}}>
                                        {/* {this.props.user !== "" ?  */}
                                        
                                        <div style={{marginTop: "6.5px"}}>
                                            <AlertModal item={item} alert={this.props.alert}/>
                                        </div> 
                                        
                                        {/* :
                                        
                                        <div></div>
                                        
                                        } */}
                                        
                                        <div style={{position: "relative", right: "8%"}}>
                                        <i className="material-icons removeBtn" data-tip={"Remove from watchlist"} onClick={() => this.removeItem(this.props.watch, item)}>cancel</i>
                                        <ReactTooltip />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                
                    :

                    watchedItems.length > 0 ? watchedItems.map(item =>
                        <div className="container">
                            <div className="card watchCard">
                                <div className="row">
                                    <div className="col-4 col-sm-3">
                                        <img src={item.image} className="img-fluid watchRouteImage" alt={item.title}/>
                                    </div>
                                    <div className="col-8 col-sm-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-4 priceTag2">{item.price}</div>
                                        <div className="col-4" style={{paddingLeft: "40px", fontSize: "x-large"}}>{item.source}</div>
                                        <div className="watchlistButtons col-4">
                                            <i className="material-icons alertBtn" data-tip={"Add an alert for this item"}>add_alert</i>
                                            <ReactTooltip />

                                            <i className="material-icons removeBtn" data-tip={"Remove from watchlist"}>cancel</i>
                                            <ReactTooltip />
                                        </div>
                                </div>
                            </div>
                        </div>
                        )

                    // watchedItems.length > 0 ? watchedItems.map(item =>
                    //     <div className="container watchCard2">
                    //         <div className="row">
                    //             <div className="col s2 test1"></div>
                    //             <div className="col s6 test2"></div>                  
                    //         </div>
                    //     </div>
                    //     )

                        : 

                        <div style={{textAlign: "center", marginTop: "30px"}}>You have 0 items in your Poof! watch list.</div>}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        watchedItems: state.item.watchedItems,
        usersWatchedItems: state.item.usersWatchedItems
    }
}

export default connect(mapStateToProps)(WatchlistRoute);