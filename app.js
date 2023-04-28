const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1. Middlewares
const app = express();
//A middleware for sending body in the http request
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/tours", tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
