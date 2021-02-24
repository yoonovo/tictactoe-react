import React, { Component } from 'react';
import './App.css';

class WinPopup extends Component {
  constructor(props) {
    super(props); 
    this.state = {
    }
  };

  render() {    
    return (
      <div className="WinPopup">
        {this.props.name}
      </div>
    )
  }
}

export default WinPopup;
