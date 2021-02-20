import React from 'react'
import ReactDOM from 'react-dom'
import Alley from './alley.jsx'
import Keypad from './keypad.jsx'

let CurrentPlay = ({currentPins, onKeypadClick}) => (
  <section className="current-play">
    <Alley currentPins={currentPins}/>
    <Keypad onKeypadClick={onKeypadClick}/>
  </section>
)

export default CurrentPlay;
