import React, { Component } from 'react';
import './App.css';

class WinPopup extends Component {
  constructor(props) {
    super(props); 
  };

  render() {   
    const { name, close } = this.props; 
    return (
      <div className="WinPopup">
        <p>The winner is <b>{name}</b>!!</p>
        <button onClick={close}>RLPLAY</button>
      </div>
    )
  }
}

export default WinPopup;
