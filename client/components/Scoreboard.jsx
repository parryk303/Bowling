import React from 'react'

var display = '';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gameInProgress = this.props.gameInProgress;
    if (gameInProgress !== true) {
      display =
        <div>
          <div className='gamestats'>
            <div className='gamestats1'>Frame: {this.props.frame}</div> <div className='gamestats2'>Roll: {this.props.roll}</div>
          </div>
          <div className='scoreTitle'>Score</div>
          <div className='score'>{this.props.score}</div>
        </div>
    } else {
      display = <div> play new game! </div>
    }
    return (
      <div>
        {display}
      </div>
    )
  }
}

export default ScoreBoard;
