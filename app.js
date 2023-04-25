const fs = require('fs');

const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();
//A middleware for sending body in the http request
app.use(express.json());

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

app.post("/api/v1/tours", (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (error) => {
    response.status(201).json({
      status: "Success",
      data: {
        tour: newTour
      }
    })
  })
});

app.get("/api/v1/tours/:id", (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID"
    })
  }
  else {
    response.status(200).json({
      status: "Success",
      data: {
        tours: tour
      }
    })
  }
})

app.patch("/api/v1/tours/:id", (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID"
    })
  }
  else {
    response.status(200).json({
      status: "Success",
      data: {
        tours: "Updated the tour"
      }
    })
  }
});

app.listen(port, () => {
  console.log(`Server is started`, port);
})