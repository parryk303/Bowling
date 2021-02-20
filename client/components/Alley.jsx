import React from 'react'
import ReactDOM from 'react-dom'
import { Pin } from './pin.jsx'

let Alley = ({currentPins}) => (
  <section className="current-play__alley">
    <div className="current-play__opacity"></div>
    <div className="current-play__pins">
      {currentPins.map( (pin, index) =>
        <Pin pin={pin} key={index}/>
      )}
    </div>
  </section>
);

export default Alley;