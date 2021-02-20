import React from 'react'
import ReactDOM from 'react-dom'

export class Pin extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let classToAdd = "current-play__pin";
    if(this.props.pin === 0){
      classToAdd += " is-hidden"
    }
    return (
      <div className={classToAdd}></div>
    )
  }
}
