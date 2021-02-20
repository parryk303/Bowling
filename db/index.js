var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/bowling');

var scoreSchema = new Schema({
  game_id: Number,
  score: Number,
  date: Date
})

var counterSchema = new Schema({
  game_id: Number,
  sequence_value: Number
})

var Score = mongoose.model('Score', scoreSchema);
var Counter = mongoose.model('Counter', counterSchema);

module.exports = Score;
module.exports = Counter;
