import React from 'react'
import reactDOM from 'react-dom'
import Keypad from './components/keypad.jsx'
import ScoreBoard from './components/scoreBoard.jsx'
import ScoresList from './components/scoresList.jsx'
import axios from 'axios'

var display = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 1,
      roll: 0,
      score: 0,
      rollScore: 0,
      pinsHit: 0,
      pinsLeftThisFrame: 10,
      gameInProgress: true,
      gameJustEnded: false,
      scoreSaved: false,
      data: []
    }
    this.gameReset = this.gameReset.bind(this);
    this.setPinsHit = this.setPinsHit.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.retrieveScore = this.retrieveScore.bind(this);
    this.checkGameStatus = this.checkGameStatus.bind(this);
  }

  componentDidMount() {
    this.retrieveScore();
  }

  saveScore() {
    console.log('score in axios: ', this.state.score)
    console.log('**** saveScore Status triggered')
    axios.post('/savescores', {
      score: this.state.score
    })
      .then(function (response) {
        console.log(response);
        this.setState({
          scoreSaved: true
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.retrieveScore();
  }

  retrieveScore() {

    axios.get('/getscores')
      .then(function (response) {
        this.setState({
          scoreSaved: true,
          data: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  checkGameStatus(e) {
    if (this.state.frame === 10 && this.state.roll === 2 || this.state.frame === 10 && this.state.roll === 1 && this.state.rollScore === 30) {
      this.setState({
        gameInProgress: false,
        gameJustEnded: true
      })
      if (!this.state.scoreSaved) {
        console.log('**** checkGame Status triggered')
        this.saveScore();
      }
    } else {
      this.setPinsHit(e);
    }
  }

  setPinsHit(e) {
    if (this.state.gameInProgress) {
      /* random button */
      if (e === 13) {
        console.log('pins left', this.state.pinsLeftThisFrame)
        e = Math.floor((Math.random() * this.state.pinsLeftThisFrame) + 1);
        console.log('e:', e)
      }
      this.setState({
        pinsHit: e
      })
      /* game logic for 1st roll */
      if (this.state.roll === 0 || this.state.roll === 1) {
        this.setState({
          pinsLeftThisFrame: 10 - e,
          roll: this.state.roll + 1
        })
        /* Scoring for 1st roll */
        if (e === 10) {
          this.setState({
            rollScore: 30,
            roll: 1,
            frame: this.state.frame + 1
          }, () => {
            this.setState({
              score: this.state.score + this.state.rollScore
            })
          })
        } else {
          this.setState({
            rollScore: e
          }, () => {
            this.setState({
              score: this.state.score + this.state.rollScore
            })
          })
        }
        /* End scoring for 1st roll */

        /* game logic for 2nd roll */
      } else if (this.state.roll === 2) {
        this.setState({
          roll: 1,
          frame: this.state.frame + 1,
          pinsLeftThisFrame: 10
        })
        /* Scoring for 2nd roll */
        if (e === this.state.pinsLeftThisFrame) {
          this.setState({
            rollScore: e + 10
          }, () => {
            this.setState({
              score: this.state.score + this.state.rollScore
            })
          })
        } else {
          this.setState({
            rollScore: e
          }, () => {
            this.setState({
              score: this.state.score + this.state.rollScore
            })
          })
        }
      }
    }
  }

  gameReset() {
    this.setState({
      frame: 1,
      roll: 0,
      score: 0,
      pinsHit: 0,
      rollScore: 0,
      gameInProgress: true,
      gameJustEnded: false,
      scoreSaved: false
    })
  }

  render() {
    if (this.state.gameJustEnded) {
      display = <div className="replay" onClick={() => this.gameReset()}>Click to Play Again!</div>
    } else {
      display = '';
    }
    return (
      <div className="innercontainer">
        <div className="col noselect">
          <h1 className="noselect">Choose Your Score</h1>
          <Keypad checkGameStatus={this.checkGameStatus} />
          <ScoreBoard frame={this.state.frame} roll={this.state.roll} score={this.state.score} gameInProgress={this.gameInProgress} />
          {display}
        </div>
        {/* <div className="col">
          <div className="scoreslist ">
            <ScoresList data={this.state.data} />
          </div>
        </div> */}
      </div>
    )
  }
}

reactDOM.render(<App />, document.getElementById('app'));
