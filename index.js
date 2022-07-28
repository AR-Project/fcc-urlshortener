require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = {};

// URL Validator
const isValidUrl = (str) => {
  // Still not sure about regex
  const regex = /^(https?:\/\/)?(localhost|[\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?/ig
  if (str.match(regex)) return true;
  return false;
}

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:url?', (req, res) => {
  // Get short_url from parameters
  const {url} = req.params;
  
  // Check if short_url already in database
  if (database[url] != undefined) {
    res.redirect(`${database[url]}`) // Redirect using value of current database url
  } else {
    res.send(`invalid short url`); // Invalid short_url
    res.end();
  }
})

app.post('/api/shorturl', (req, res) => {
  // Parsing body 
  const { url } = req.body;
  // console.log(url);

  // Check if url are valid url
  if (isValidUrl(url)) {
    // TODO: Check if url already in database, for now, all url will be pushed
    // into database, no matter it is duplicate.

    // Assign short url
    const short_url = Object.keys(database).length + 1;

    // Add url into database
    database[short_url] = url;
    // TODO: Store url in database

    // Wrap a respond if url is valid
    const wrapper = {
      original_url: url,
      short_url: short_url,
    }

    // Send wrap into json
    res.json(wrapper);
    res.end();
  } else {
    res.json({
      error: "invalid url"
    })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
