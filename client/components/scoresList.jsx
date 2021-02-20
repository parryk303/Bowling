import React from 'react'

class ScoresList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var numbers = [];
    for (var i = 1; i <= 30; i++) {
      numbers.push(i);
    }

    const items = this.props.data.map((item, key) =>
      <li key={key}>Game {key + 1} - {item.score} pts</li>
    );

    return (
      <div>
        Last 30 Scores
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default ScoresList;
