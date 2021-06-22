const express = require('express');
morgan = require('morgan');

const app = express();
app.use(morgan('common'));


let topMovies = [
  {
    title: 'A Moment to Remember',
    director: 'John H. Lee'
  },
  {
    title: 'Hanyo',
    director: 'Im Sang-soo'
  },
  {
    title: 'Parasite',
    director: 'Bong Joon-ho'
  },
  {
    title: 'Bittersweet Life',
    director: 'Kim Jee-won'
  },
  {
    title: 'Addicted',
    director: 'Park Young-hoon'
  },
  {
    title: 'Night in Paradise',
    director: 'Park Hoon-jung'
  },
  {
    title: 'Daisy',
    director: 'Lau Wai Keung'
  },
  {
    title: 'Be With You',
    director: 'Lee Jang-hoon'
  },
  {
    title: 'The Man from Nowhere',
    director: 'Lee Jeong-beom'
  },
  {
    title: 'My Father',
    director: 'Hwang Dong-hyuk'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Top 10 Movies Collection!');
});

app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
