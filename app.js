/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 2/14/22
 * Creative Project #4: APIs
 * Description:
 */

'use strict';

const express = require('express');
const multer = require('multer');
const app = express();

const path = require('path');

app.get('/', function(req, res) {
  res.type('text');
  res.send('Hello World!');
  // res.sendFile(path.join(__dirname, '/public/index.html'));
})

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'What is worse than raining cats and dogs?',
    'response': 'Hailing taxis'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  }
];

// define endpoint 1 here
app.get('/jokebook/categories', function(req, res) {
  res.type('text');
  let message = '';
  for (let i = 0; i < categories.length; i++) {
    message = message.concat(`A possible category is ${categories[i]}\n`)
  }
  res.send(message);
})

// define endpoint 2 here
app.get('/jokebook/joke/:category', function(req, res) {
  res.type('json');
  let category = req.params['category']
  if (categories.includes(category)) {
    let joke = category === 'lameJoke' ? lameJoke : funnyJoke;
    let rand = randomSelection(joke.length);
    res.send(joke[rand]);
  } else {
    res.status(400).send({'error': 'no category listed for category'});
  }
})

function randomSelection(numOptions) {
  return Math.floor(Math.random() * numOptions);
}

app.use(express.static('public'));
app.use(multer().none());
const PORT = process.env.PORT || 3000;
app.listen(PORT);
