import React from 'react';

class Keypad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.checkGameStatus(parseInt(e.target.id.substr(1)));
  }

  render() {
    return (
      <div id="pad">
        <div className="keypad noselect">
          <div className="keypadRow">
            <div id="s1" className="sq" onClick={this.handleClick}>1</div>
            <div id="s2" className="sq" onClick={this.handleClick}>2</div>
            <div id="s3" className="sq" onClick={this.handleClick}>3</div>
          </div>
          <div className="keypadRow">
            <div id="s4" className="sq" onClick={this.handleClick}>4</div>
            <div id="s5" className="sq" onClick={this.handleClick}>5</div>
            <div id="s6" className="sq" onClick={this.handleClick}>6</div>
          </div>
          <div className="keypadRow">
            <div id="s7" className="sq" onClick={this.handleClick}>7</div>
            <div id="s8" className="sq" onClick={this.handleClick}>8</div>
            <div id="s9" className="sq" onClick={this.handleClick}>9</div>
          </div>
          <div className="keypadRow">
            <div id="s11" className="non"></div>
            <div id="s10" className="sq" onClick={this.handleClick}>10</div>
            <div id="s12" className="non"></div>
          </div>
        </div>

        <div className="randomButton noselect">
          <div id="s13" className="random" onClick={this.handleClick}>Random Bowl!</div>
        </div>
      </div>
    )
  }
}

export default Keypad;
