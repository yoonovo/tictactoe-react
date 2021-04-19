import React, { Component, createRef } from 'react';
import './App.css';
import WinPopup from './WinPopup';

class App extends Component {
  constructor(props) {
    super(props); 
    this.canvasRef = createRef();
    this.ctx = null;
    this.player = [ 'Player1', 'Player2' ];
    this.state = {
      tictactoe: [
        ['', '', ''],
        ['', '', ''], 
        ['', '', ''] 
      ],
      order: 0,
      winPlayer: '',
      modalOpen: false
    }
  };

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext("2d");    
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 10; 
    this.ctx.lineCap = 'round'; 
    this.state.tictactoe.forEach((el, idx) => {
      if((200*idx) > 0){
        this.ctx.beginPath();
        this.ctx.moveTo((200*idx), 10);
        this.ctx.lineTo((200*idx), 590);
        this.ctx.stroke();   
        this.ctx.beginPath();
        this.ctx.moveTo(10, (200*idx));
        this.ctx.lineTo(590, (200*idx));
        this.ctx.stroke(); 
      }
    })
  }

  // 화면에 O 혹은 X 그리기
  dataChange(x, y) {
    if(this.state.winPlayer) return; // 이긴 사람이 있을 경우
    const tictactoe = this.state.tictactoe;
    if(tictactoe[y][x] === 0 || tictactoe[y][x] === 1) return; // O 혹은 X가 있을 경우 

    tictactoe[y][x] = this.state.order === 0 ? 0 : 1; 
    this.setState({ 
      tictactoe: tictactoe
   });

    this.result();
  }

  // 승리여부 체크
  result(){
    const victory = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22'],
      ['00', '10', '20'],
      ['01', '11', '21'],
      ['02', '12', '22'],
      ['00', '11', '22'],
      ['02', '11', '20'],
    ];
    const tictactoe = this.state.tictactoe;
    let arrO = [];
    let arrX = [];
    tictactoe.forEach((val, y) => {
      val.forEach((el, x) => {
        switch(el){
          case 0:
            arrO.push(String(x)+y);
            break;
          case 1:
            arrX.push(String(x)+y);
            break;
          default:
            break;
        }
      })
    }, []);

    const win = (value) => {
      return victory.some((val) => {
        let arr = [];
        val.forEach(el => {    
          const res = value.filter(v => v === el);
          if(res.length > 0){
            arr.push(res);
          }
        })
        return arr.length === 3;
      })
    }
    
    if(win(arrO) || win(arrX)){
      this.setState({
        winPlayer: this.player[this.state.order]
      })
    }else{
      this.setState({ 
        order: this.state.order === 0 ? 1 : 0
      });
      const chkBlank = tictactoe.some(el => {
        return el.some(v => v === '');
      });

      // 무승부 체크 
      if(!chkBlank){
        this.setState({
          winPlayer: 'draw'
        });
      }
    }
  }

  reset(){
    this.setState({ 
      tictactoe: [
        ['', '', ''],
        ['', '', ''], 
        ['', '', ''] 
      ],
      order: 0,
      winPlayer: ''
    });
  }

  render() {    
    return (
      <div className="App">
        <h3 className="title">TicTacToe
          <i className="xi-refresh" onClick={this.reset.bind(this)}></i>
        </h3>
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
                  {val === '' ? '' : val === 0 ? 
                  <span className="player1">O</span> : 
                  <span className="player2">X</span>}
                </li>
              });
            })}
          </ul>
        </div>
        { this.state.winPlayer !== "" && <WinPopup name={this.state.winPlayer} close={this.reset.bind(this)}/> }
      </div>
    )
  }
}

export default App;
