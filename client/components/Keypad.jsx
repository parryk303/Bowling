import React from 'react'
import ReactDOM from 'react-dom'
import Key from "./key.jsx"

let Keypad = ({onKeypadClick}) => (
  <section className="current-play__keypad keypad">
    {[0,1,2,3,4,5,6,7,8,9,10].map( index =>
      <Key onKeypadClick={onKeypadClick} key={index} idx={index} />
    )}
  </section>
)

export default Keypad
