import React, { Component } from 'react';
import './App.css';
import Snake from './Snake';
import Food from './Food';

function getRandomCoordinate(){
  let min=1;
  let max=98;
  let x=Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y=Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y];
}
const intialState={
    food:getRandomCoordinate(),
    direction:'RIGHT',
    speed:200,
    snakeDots:[
      [0,0],
      [2,0]
    ]
}
class App extends Component {
  state = intialState;
   componentDidMount(){
      setInterval(this.moveSnake,this.state.speed);
      document.onkeydown=this.onkeydown;
   }
   onkeydown=(e)=>{
      e=e||window.event
      switch(e.keyCode){
        case 38:
          this.setState({direction:"UP"});
          break;
        case 40:
          this.setState({direction:"DOWN"});
          break;
        case 37:
          this.setState({direction:"LEFT"});
          break;
        case 39:
          this.setState({direction:"RIGHT"});
          break;
        default:
          break;
      }
   }
   moveSnake=()=>{
     let dots=[...this.state.snakeDots];
     let head=[...dots[dots.length-1]];
     switch(this.state.direction){
      case 'RIGHT':
         head=[head[0]+2,head[1]];
         break;
      case 'LEFT':
        head=[head[0]-2,head[1]];
        break;    
      case 'DOWN':
        head=[head[0],head[1]+2];
        break;
      case 'UP':
        head=[head[0],head[1]-2];
         break;
      default:
        break;
     }
     dots.push(head);
     dots.shift();
     this.setState({snakeDots:dots})
   }
   checkIfOutOfBorder=()=>{
     let head=this.state.snakeDots[this.state.snakeDots.length-1];
     if(head[0]>=100 || head[1]>=100 || head[0]<0 || head[1]<0){
       this.GameOver();
     }
   }
   GameOver=()=>{
     alert("game over");
     this.setState(intialState)
   }
   componentDidUpdate(){
     this.checkIfOutOfBorder();
     this.checkIfCollusion();
     this.checkIfEat();
   }
   checkIfCollusion=()=>{
     let snake=[...this.state.snakeDots];
     let head=snake[snake.length-1];
     snake.pop();
     snake.forEach(dot=>{
      if(head[0]==dot[0]&& head[1]==dot[1]){
        this.GameOver();
      }
     })
   }
   checkIfEat=()=>{
     let head=this.state.snakeDots[this.state.snakeDots.length-1];
     let food=this.state.food;
     if(head[0]==food[0] && head[1]==food[1]){
       this.setState({
         food:getRandomCoordinate()
       })
       this.enLargeSnake();
     }
   }
   enLargeSnake=()=>{
    let newSnake=[...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({snakeDots:newSnake})
   }
  render() { 
    return ( 
      <div className="gameArea">
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
      </div>
     );
  }
}

 
export default App;