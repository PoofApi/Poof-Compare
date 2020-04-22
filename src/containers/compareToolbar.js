import React, {Component} from 'react';
import '../App.css';

class CompareToolbar extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="compareToolbar"><i className="material-icons toggleButton" onClick={() => this.props.toggleToolbar()} >expand_less</i></div>
        );
    }
}

export default CompareToolbar;