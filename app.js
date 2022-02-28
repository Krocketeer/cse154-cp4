/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 2/25/22
 * Creative Project #4:
 * Description: Provides API functionality for the vaccine appointment finder:
 * information about vaccine stock in cities and cities with specified vaccines
 */

'use strict';
const express = require('express');
const multer = require('multer');
const app = express();

let cities = [
  {'city': 'Seattle', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 10},
        {'vaccine-name': 'Moderna', 'doses': 10},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 20}
      ]},
  {'city': 'Renton', 'vaccines':
      [
        {'vaccine-name': 'Moderna', 'doses': 6},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 14}
      ]},
  {'city': 'Kent', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 16},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 40}
      ]},
  {'city': 'Bellevue', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 2},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 4}
      ]}
];

app.get('/city/:name', function(req, res) {
  res.type('json');
  let city = capitalizeFirstLetter(req.params['name']);
  for (let entry of cities) {
    if (city === entry['city']) {
      res.send(entry);
    }
  }
  res.status(400).send(`No entries found for ${city}. Please try again.`);
});

app.get('/vaccine/:brand', function(req, res) {
  res.type('text');
  let pfizer = 'Seattle, Kent, Bellevue';
  let moderna = 'Seattle, Renton';
  let johnson = 'Seattle, Kent, Bellevue';
  let vaccineNames = ['pfizer', 'moderna', 'johnson'];
  let name = req.params['brand'];
  name = name === 'Johnson & Johnson' ? 'johnson' : String(name).toLowerCase();
  if (vaccineNames.includes(name)) {
    if (name === 'pfizer') {
      res.send(pfizer);
    } else if (name === 'moderna') {
      res.send(moderna);
    } else {
      res.send(johnson);
    }
  } else {
    res.status(400).send("An error occurred, could not get results. Please try again");
  }
});

/**
 * Takes a string, capitalizes the first letter and lower cases everything else
 * @param {string} str :the input string
 * @returns {string} :the formatted string
 * Base credit: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 */
function capitalizeFirstLetter(str) {
  str = String(str).toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
}

app.use(express.static('public'));
app.use(multer().none());
const PORT = process.env.PORT || 3000;
app.listen(PORT);
