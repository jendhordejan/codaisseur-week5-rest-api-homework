//this is your model.js equivalent!
const Sequelize = require("sequelize"); //import model.js
const db = require("../db");

const Movie = db.define("movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

module.exports = { Movie };
