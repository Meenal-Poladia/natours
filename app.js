const express = require('express');

const app = express();

const port = 3000;

app.get("/", (request, response) => {
  response.status(200).json({message: "I am on root", app: "Natours"});
})

app.post("/overview", (request, response) => {
  response.status(200).send("I am on overview");
})

app.listen(port, () => {
  console.log(`Server is started`, port);
})