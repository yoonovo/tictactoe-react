import React, { Component } from 'react';
import './App.css';

class WinPopup extends Component {
  render() {   
    const { name, close } = this.props; 
    return (
      // 승부결과를 띄우는 알럿
      <div className={name === 'draw' ? 'WinPopup draw' : 'WinPopup'} >
        {
          name === 'draw' ? 
          <p className="draw"><b>A Draw :-(</b></p>
          : <p>The winner is <b>{name}</b> :-)</p>
        }
        <button onClick={close}>RLPLAY</button>
      </div>
    )
  }
}

export default WinPopup;
