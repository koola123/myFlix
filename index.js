// Importing modules & packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

// List of movies
let movies = [
  {
    id: 1,
    title: 'A Moment to Remember',
    genre: 'Drama',
    imageUrl: '',
    director: 'John H. Lee'
  },
  {
    id: 2,
    title: 'Hanyo',
    genre: 'Thriller',
    imageUrl: '',
    director: 'Im Sang-soo'
  },
  {
    id: 3,
    title: 'Parasite',
    genre: 'Drama',
    imageUrl: '',
    director: 'Bong Joon-ho'
  },
  {
    id: 4,
    title: 'Bittersweet Life',
    genre: 'Action',
    imageUrl: '',
    director: 'Kim Jee-won'
  },
  {
    id: 5,
    title: 'Addicted',
    genre: 'Thriller',
    imageUrl: '',
    director: 'Park Young-hoon'
  },
  {
    id: 6,
    title: 'Night in Paradise',
    genre: 'Crime-Drama',
    imageUrl: '',
    director: 'Park Hoon-jung'
  },
  {
    id: 7,
    title: 'Daisy',
    genre: 'Melodrama',
    imageUrl: '',
    director: 'Lau Wai Keung'
  },
  {
    id: 8,
    title: 'Be With You',
    genre: 'Romance',
    imageUrl: '',
    director: 'Lee Jang-hoon'
  },
  {
    id: 9,
    title: 'The Man from Nowhere',
    genre: 'Action-Thriller',
    imageUrl: '',
    director: 'Lee Jeong-beom'
  },
  {
    id: 10,
    title: 'My Father',
    genre: 'Drama',
    imageUrl: '',
    director: 'Hwang Dong-hyuk',


  }
];

// Gets access to the root file
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 movies club!');
});
// Gets information about the webserver API project
app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});
// Gets the list of movies
app.get('/movies', (req, res) => {
  res.json(movies);
});
// Gets data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});
// Gets data about a genre by name/title
app.get('/genres/:title', (req, res) => {
  res.json(genres.find((genre) =>
    { return movie.genre === req.params.title }));
});
// Gets data about a director by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return movie.director === req.params.name }));
});

// Adds a movie to the list of favorites
app.post('/favorites', (req, res) => {
  let movie = req.body;

  if (!movie.title) {
    const message = 'Missing "title" in request body';
    res.status(400).send(message);
  } else {
    movie.id = uuid.v4();
    movies.push(movie);
    res.status(201).send(movie);
  }
});
// Deletes a movie from the list of favorites
app.delete('/favorites/:id', (req, res) => {
  let movie = movies.find((movie) => { return movie.id === req.params.id });

  if (movie) {
    movies = movies.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('Movie ' + req.params.id + ' was deleted.');
  }
});

// Deletes a user from our list by ID
app.delete('/unregister', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.delete });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.delete });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

// Update the "user info" of a existing user by user name, password, email, date of birth
app.put('/users/:name/:password/:email/:dateOfBirth', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });

  if (user) {
    user.classes[req.params.class] = parseInt(req.params.grade);
    res.status(201).send(req.params.name + req.params.password + req.params.email + req.params.dateOfBirth + ' have been updated.');
  } else {
    res.status(404).send('User with the name ' + req.params.name + ' was not found.');
  }
});

// Allow new users to register
app.delete('/register', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.register });

  if (user) {
    users = users.filter((obj) => { return obj.id == req.params.register });
    res.status(201).send('User ' + req.params.id + ' was successfully registered.');
  }
});



app.use(express.static('public'));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests on localhost:8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
