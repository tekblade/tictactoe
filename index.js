import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let priority=[{value: 'X'}];
let help=0;

class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}> 
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      position: [null,null,null,null,null,null,null,null,null],
      status1: 'Next player: X',
      status2: 'Next player: O',
    };
  }
  setPool(i, pool) {
    if(pool === null) return; // prevent that any position gets set back to `null`
    if(this.state.position[i] !== null) return; // prevent that a pool gets set twice
    else{
      this.state.position[i]=pool;
      return;
    }
  }
  checkIfpriority(){
    for(let i=0;i<8;i++)
      if(this.state.position[i]==='X' || this.state.position[i]==='O') help++;
  }
  func(i) {
    if(this.state.position[i]!==null) return;
    this.checkIfpriority();
    if((help % 2)==0){
      priority[0]={value: 'X'};
      let y=document.getElementsByClassName("status");
      y[0].innerHTML=this.state.status2;
    }
    else{
      priority[0]={value: 'O'};
      let y=document.getElementsByClassName("status");
      y[0].innerHTML=this.state.status1;
    }
    this.setPool(i,priority[0].value);
    let x=document.getElementsByClassName("square");
    x[i].innerHTML= this.state.position[i];
    if(help>7){
      let y=document.getElementsByClassName("status");
      y[0].innerHTML="The game has ended";
    }
    help=0;
  }
  renderSquare(i) {
    return <Square onClick={() => this.func(i)} value={this.state.position[i]} />;
  }
  
  render() {
    
    return (
      <div>
        <div className="status">Next player: X</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">      
          <Board />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
