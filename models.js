// Mongoose import function
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining schema for movies list
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date
  },
  ImagePath: String,
  Featured: Boolean
});

// Defining schema for users list
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

//
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
// Exporting modules for use in index.js file
module.exports.Movie = Movie;
module.exports.User = User;
