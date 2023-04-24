const fs = require('fs');

const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();
const port = 3000;

app.get("/api/v1/tours", (request, response) => {
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  })
});

app.listen(port, () => {
  console.log(`Server is started`, port);
})