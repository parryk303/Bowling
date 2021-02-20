import React from 'react'
import ReactDOM from 'react-dom'

let Key = ({onKeypadClick, idx}) => (
    <div className="keypad__key" onClick={() => onKeypadClick({idx})}>{idx}</div>
)

export default Key