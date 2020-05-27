import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import '../App.css';
 
class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 0
    }
  }
 
  handleOnChange = (value) => {
    this.setState({
      volume: value
    });
    this.props.getValue(this.state.volume);
  }

 
  render() {
    let submitValue = this.props.value;
    let { volume } = this.state
    submitValue = this.state.volume;
    return (
      <Slider
        value={volume}
        orientation="vertical"
        onChange={this.handleOnChange}
      />
    )
  }
}

export default VolumeSlider;