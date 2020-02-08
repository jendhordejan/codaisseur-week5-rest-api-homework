//this is your model.js + db.js equivalent!
const Sequelize = require("sequelize"); //import model.js
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

const Movie = db.define("movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

//---
const moviesCollection = [
  {
    title: "Anger Management",
    yearOfRelease: 2003,
    synopsis:
      "A man comes face to face with the rage he didn't know he had in this comedy..."
  },
  {
    title: "The Godfather",
    yearOfRelease: 1972,
    synopsis: "Francis Ford Coppola''s epic features Marlon Brando .."
  },
  {
    title: "The Great Gatsby",
    yearOfRelease: 2013,
    synopsis:
      "The Great Gatsby follows Fitzgerald-like, would-be writer Nick Carraway (Tobey Maguire) as he leaves the Midwest and comes to New York City in the spring of 1922"
  }
];
//---

db.sync({ force: false })
  .then(() => Movie.truncate())
  .then(() =>
    Promise.all(moviesCollection.map(movieItem => Movie.create(movieItem)))
  )
  .catch(console.error);

module.exports = { Movie };
