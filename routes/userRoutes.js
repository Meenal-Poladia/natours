const express = require('express');

const router = express.Router();

const getAllUsers = (request, response) => {
  response.status(500).json({
    status: "Failed",
    message: "Route yet not defined"
  })
};

const createUser = (request, response) => {
  response.status(500).json({
    status: "Failed",
    message: "Route yet not defined"
  })
};

const getUser = (request, response) => {
  response.status(500).json({
    status: "Failed",
    message: "Route yet not defined"
  })
};

const updateUser = (request, response) => {
  response.status(500).json({
    status: "Failed",
    message: "Route yet not defined"
  })
};

const deleteUser = (request, response) => {
  response.status(500).json({
    status: "Failed",
    message: "Route yet not defined"
  })
};

router.route("/")
  .get(getAllUsers)
  .post(createUser)

router.route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router;