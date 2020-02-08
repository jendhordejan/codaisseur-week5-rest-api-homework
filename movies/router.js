const Router = require("express");
const { Movie } = require("./sequelize-rest");

const router = new Router();

//- _read all_ movies (the collections resource)
router.get("/", (request, response, next) => {
  Movie.findAll()
    .then(movie => response.json(movie))
    .catch(error => next(error));
});

//- _create_ a new movie resource
router.post("/", (request, response, next) => {
  Movie.create(request.body)
    .then(movie => response.json(movie))
    .catch(error => next(error));
});

//- _read_ a single movie resource
router.get("/:id", (request, response, next) => {
  const movieId = parseInt(request.params.id);
  Movie.findByPk(movieId).then(movie => {
    !movie
      ? response.status(400).send("Movie not found")
      : response.json(movie);
  });
});

//- _update_ a single movie resource
router.put("/:id", (request, response, next) => {
  Movie.findOne({
    where: {
      id: request.params.id
    }
  })
    .then(movie => {
      if (movie) {
        movie.update(request.body).then(task => response.json(task));
      } else {
        response.status(404).send("Movie not found");
      }
    })
    .catch(next);
});

//- _delete_ a single movie resource
router.delete("/:id", (request, response, next) => {
  Movie.destroy({
    where: {
      id: request.params.id
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        response.status(204).send("Movie deleted");
      } else {
        response.status(404).send("Movie you want to delete is not found");
      }
    })
    .catch(next);
});

module.exports = router;
