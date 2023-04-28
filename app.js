const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

//1. Middlewares
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const app = express();
//A middleware for sending body in the http request
app.use(express.json());
app.use(morgan('dev'));

const port = 3000;

//2. Function or Controllers
const getAllTours = (request, response) => {
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  })
}

const createTour = (request, response) => {
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
}

const updateTour = (request, response) => {
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
}

const deleteTour = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    response.status(404).json({
      status: "Failed",
      message: "Invalid ID"
    })
  }
  else {
    response.status(204).json({
      status: "Success",
      data: null
    })
  }
}

const getTour = (request, response) => {
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
}

//3. Routes
app.route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour)

app.route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

// Listening to Server
app.listen(port, () => {
  console.log(`Server is started`, port);
})