const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const movieRouter = require("./movies/router");

let msg_ctr = 0;

const msglimitMiddleware = (request, response, next) => {
  if (msg_ctr < 5) {
    request.body.message
      ? response.send(request.body)
      : response.status(400).end();
    msg_ctr = msg_ctr + 1;
  } else {
    response.status(429).end();
  }
  next();
};

app.use(bodyParser.json());

//test: http localhost:3000/messages message='If I hate arrays, does that make me array-ist?'
app.post("/messages", msglimitMiddleware, (request, response) => {});
app.use("/movie", movieRouter);

app.listen(port, () => console.log(`App started in port: ${port}`));
