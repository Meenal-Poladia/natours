const fs = require('fs');
const { request, response } = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (request, response) => {
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours
    }
  })
}

exports.createTour = (request, response) => {
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

exports.checkID = (request, response, next, value) => {
  if (value > tours.length) {
    return response.status(404).json({
      status: "Failed",
      message: "Invalid ID"
    })
  }
  next();
}

exports.updateTour = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (tour) {
    response.status(200).json({
      status: "Success",
      data: {
        tours: "Updated the tour"
      }
    })
  }
}

exports.deleteTour = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (tour) {
    response.status(204).json({
      status: "Success",
      data: null
    })
  }
}

exports.checkRequestBody = (request, response, next) => {
  if (!request.body.name || !request.body.price) {
    return response.status(400).json({
      status: "Failed",
      message: "Missing name or price"
    });
  }
  next();
}

exports.getTour = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  if (tour) {
    response.status(200).json({
      status: "Success",
      data: {
        tours: tour
      }
    })
  }
}
