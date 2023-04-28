const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

router.route("/")
  .get(getAllTours)
  .post(createTour)

router.route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;