import React from 'react'
import ReactDOM from 'react-dom'
import { Frame } from './frame.jsx'

export class Scoreboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      frames: [[],[],[],[],[],[],[],[],[],[]],
      frameTotals: [],
      strikes: {},
      spares: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    // Don't update if just changed current pins
    if(!nextProps.frameResetting){
      let displayOfBowl = this.checkIfSpareOrStrike(nextProps.currentBowl);
      this.checkForPreviousSparesOrStrikes(nextProps.currentBowl);
      let framesCopy = this.state.frames.slice();
      let currentFrameTuple = framesCopy[this.props.currentFrame];
      if(currentFrameTuple.length < 2){ // Should use better tactic than this
        currentFrameTuple.push(displayOfBowl);
      }
      this.setState(
        { frames: framesCopy },
        () => this.calculateTotal()
      );
    }
  }

  checkIfSpareOrStrike(justBowled){
    let previousBowl = this.state.frames[this.props.currentFrame][0];
    if(this.props.currentSubFrame == "A" && justBowled === 10){ // Not updated to B yet?
      console.log("Strike!");
      justBowled = "X";
      let strikesCopy = Object.assign({}, this.state.strikes);
      strikesCopy[this.props.currentFrame] = [null, null];
      this.setState({ strikes: strikesCopy });
    } else if (this.props.currentSubFrame == "B" && (justBowled + previousBowl === 10)){
      console.log("Spare!");
      justBowled = "/";
      let sparesCopy = Object.assign({}, this.state.spares);
      sparesCopy[this.props.currentFrame] = null;
      this.setState({ spares: sparesCopy });
    }
    return justBowled;
  }

  checkForPreviousSparesOrStrikes(justBowled) {
    let currentFrame = this.props.currentFrame;
    let previousFrameIdx = currentFrame - 1;
    let twoPrevFrameIdx = currentFrame - 2;
    if (this.state.spares[previousFrameIdx] === null){
      let sparesCopy = Object.assign({}, this.state.spares);
      sparesCopy[previousFrameIdx] = justBowled;
      this.setState ({spares: sparesCopy });
    }

    if (this.state.strikes[previousFrameIdx] && this.state.strikes[previousFrameIdx][0] === null){
      let strikesCopy = Object.assign({}, this.state.strikes);
      strikesCopy[previousFrameIdx][0] = justBowled;
      this.setState ({strikes: strikesCopy });
    }
    if (this.state.strikes[twoPrevFrameIdx] && this.state.strikes[twoPrevFrameIdx][1] === null){
      let strikesCopy = Object.assign({}, this.state.strikes);
      strikesCopy[twoPrevFrameIdx][1] = justBowled;
      this.setState ({strikes: strikesCopy });
    }
  }

  calculateTotal(){
    let total = 0;
    console.log('frames: ', this.state.frames);
    for(var frameIdx = 0; frameIdx < this.state.frames.length; frameIdx++){
      let frame = this.state.frames[frameIdx];
      console.log('frame: ', frame);
      if(frame.length){
        for(var sub = 0; sub < frame.length; sub++){
          if(frame[sub] === "X"){ // Handle strike
            total += 10;
            total += this.state.strikes[frameIdx][0];
            total += this.state.strikes[frameIdx][1];
          } else if(frame[sub] === "/"){ // Handle spare
            total += (10 - frame[sub - 1]); // Add amount to make 10 in frame
            if(this.state.spares[frameIdx]){
              total += this.state.spares[frameIdx];
            }
          } else {
            total += frame[sub];
          }
        }
      }
    }
    console.log('total ', total);
    let frameTotalsCopy = this.state.frameTotals.slice();
    console.log('subFrame ', this.props.currentSubFrame);
    let isStrike = (this.props.currentSubFrame == "B" && this.props.currentBowl === 10);
    let isLastBall = (this.props.currentSubFrame === "C"); // Subframe already been updated
    console.log('isStrike ', isStrike);
    let frameIdxToUpdate = (isLastBall || isStrike) ? (this.props.currentFrame - 1) : this.props.currentFrame;
    frameTotalsCopy[frameIdxToUpdate] = total;
    this.setState({frameTotals: frameTotalsCopy});
  }


  render(){
    return (
      <section className="scoreboard">
        {this.state.frames.map( (frame, idx) =>
          <Frame frame={frame} key={idx} idx={idx} frameTotals={this.state.frameTotals}/>
        )}
      </section>
    )
  }
}
