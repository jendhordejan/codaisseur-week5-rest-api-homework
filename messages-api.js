/*
1. Add a single endpoint to the app responds to `POST` requests to the `/messages` URI.
1. When a request is sent to the endpoint, it should log the `text` property of the body to the console, and it should respond with a JSON object, for example:
​
   ```javascript
   {
      "message": "This is the message that was sent"
   }
   ```
​
   In order to parse the JSON body of the request, you will need to add the middleware for it.
Make sure you add the required dependency.
*/

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.post("/messages", (request, response) => {
  response.send(request.body);
});

app.listen(port, () => console.log(`App started in port: ${port}`));
