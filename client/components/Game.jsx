import React from 'react'
import ReactDOM from 'react-dom'
import CurrentPlay from './currentplay.jsx'
import { Scoreboard } from './scoreboard.jsx'

export class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentPins: [1,1,1,1,1,1,1,1,1,1], // Could be moved to alley?
      currentSubFrame: "A",
      currentBowl: 0,
      currentFrame: 0,
      frameResetting: false
    }
  }

  inputPinNumber(num){
    let pinsToRemove = num.idx;
    let pinsRemoved = 0;
    let currPinsCopy = this.state.currentPins.slice();
    if(pinsToRemove){
      for(var i = 0; i < currPinsCopy.length; i++){
        if(currPinsCopy[i] === 1){
          currPinsCopy[i] = 0;
          ++pinsRemoved;
          if(pinsRemoved === (num.idx)){
            break;
          }
        }
      }
    }
    this.updatePinsAfterBowl(currPinsCopy, pinsRemoved);
  }

  updatePinsAfterBowl(newPins, currentBowl){
    let islastBall = (this.state.currentSubFrame === "B");
    let isStrike = (!islastBall && currentBowl === 10);
    let newFrameResetting = (islastBall || isStrike);
    let newCurentFrame = newFrameResetting ? (this.state.currentFrame + 1) : this.state.currentFrame;
    let newSubframe = (islastBall) ? "C" : "B";
    this.setState(
      {currentPins: newPins,
      currentSubFrame: newSubframe,
      currentBowl: currentBowl,
      currentFrame: newCurentFrame,
      frameResetting: false
    },
      () => {
        setTimeout(() => {
          if(islastBall || isStrike){
            this.resetCurrentFrame();
          }
        }, 1000);
      }
    )
  }

  resetCurrentFrame(){
    this.setState({
      currentPins: [1,1,1,1,1,1,1,1,1,1],
      currentSubFrame: "A",
      frameResetting: true
    });
  }

  render(){
    return (
      <div className="main-body">
        <CurrentPlay currentPins={this.state.currentPins} onKeypadClick={this.inputPinNumber.bind(this)} />
        <Scoreboard currentBowl={this.state.currentBowl} currentFrame={this.state.currentFrame} currentSubFrame={this.state.currentSubFrame} frameResetting={this.state.frameResetting}/>
      </div>
    )
  }
}

export default Game;
