/**
 * Kenny "Ackerson" Le
 * CSE 154 AF, Winter 2022
 * TA: Ludvig Liljenberg, Marina Wooden
 * 2/25/22
 * Creative Project #4:
 * Description:
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
        {'vaccine-name': 'Johnson & Johnson', 'doses': 20},
      ]
  },
  {'city': 'Renton', 'vaccines':
      [
        {'vaccine-name': 'Moderna', 'doses': 6},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 14},
      ]
  },
  {'city': 'Kent', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 16},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 40},
      ]
  },
  {'city': 'Mercer Island', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 20},
      ]
  },
  {'city': 'Bellevue', 'vaccines':
      [
        {'vaccine-name': 'Pfizer', 'doses': 2},
        {'vaccine-name': 'Johnson & Johnson', 'doses': 4},
      ]
  },
];

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(str) {
  str = String(str).toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
}

app.get('/city/all', function(req, res) {
  res.type('json');
  res.send(cities);
});

app.get('/city/:name', function(req, res){
  res.type('json');
  let city = capitalizeFirstLetter(req.params['name']);
  for (let entry of cities) {
    if (city === entry['city']) {
      res.send(entry);
    }
  }
  res.status(400).send(`No entries found for ${city}. Please try again.`)
});

app.get('/vaccine/:brand', function(req, res) {
  res.type('text');
  let pfizer = 'Seattle, Kent, Mercer Island, Bellevue';
  let moderna = 'Seattle, Renton';
  let johnson = 'Seattle, Renton, Kent, Bellevue';
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

app.use(express.static('public'));
app.use(multer().none());
const PORT = process.env.PORT || 3000;
app.listen(PORT);
