import React, { Component, createRef } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    this.canvasRef = createRef();
    this.ctx = null;
    this.player = [ 'Alice', 'Audrey' ];
    this.dataChange = this.dataChange.bind(this);
    this.state = {
      tictactoe: [
        ['', '', ''],
        ['', '', ''], 
        ['', '', ''] 
      ],
      order: 0
    }
  };

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext("2d");    
    this.state.tictactoe.forEach((el, idx) => {
      if((200*idx) > 0){
        this.ctx.beginPath();
        this.ctx.moveTo((200*idx), 0);
        this.ctx.lineTo((200*idx), 600);
        this.ctx.stroke();   
        this.ctx.beginPath();
        this.ctx.moveTo(0, (200*idx));
        this.ctx.lineTo(600, (200*idx));
        this.ctx.stroke(); 
      }
    })
  }

  dataChange(x, y, event) {
    const arr = this.state.tictactoe;
    if(arr[y][x] === 0 || arr[y][x] === 1) return;
    arr[y][x] = this.state.order === 0 ? 0 : 1; 
    this.setState({ 
      tictactoe: arr,
      order: this.state.order === 0 ? 1 : 0
   });
  }

  render() {    
    return (
      <div className="App">
        <ul className="player-box">
          {this.player.map((el, idx) => {
            return <li key={idx} className={this.state.order === idx ? 'active' : ''}>{el}</li>
          })}
        </ul>
        <div className="tictactoe-box">
          <canvas ref={this.canvasRef} width="600" height="600"></canvas>
          <ul>
            {this.state.tictactoe.map((el, index) => {
              return el.map((val, idx) => {
                return <li key={idx} onClick={this.dataChange.bind(this, idx, index)}>
                  {val === '' ? '' : val === 0 ? 'O' : 'X'}
                </li>
              });
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
