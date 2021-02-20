const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index.js')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/'));

function getNextSequenceValue(sequenceName) {
  console.log('db', db);
  var sequenceDocument = db.findAndModify({
    query: { game_id: sequenceName },
    update: { $inc: { sequence_value: 1 } },
    new: true
  });
  return sequenceDocument.sequence_value;
}

app.post('/savescores', function (req, res) {
  db.create({
    score: req.body.score,
    date: Date.now()
  }, function (err, result) {
    if (err) {
      console.log('error inserting - server ', err);
      res.status(400).send('error inserting - server')
    } else {
      console.log('insert successful: ');
      res.status(200).send('insert successful');
    }
  }
  )
});

app.get('/getscores', function (req, res) {
  db.find({}, null, { sort: '-date', limit: 30 }, function (err, result) {
    if (err) {
      console.log('error getting records - server ', err);
      res.status(400).send('error getting records - server')
    } else {
      res.status(200).send(result);
    }
  })
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
