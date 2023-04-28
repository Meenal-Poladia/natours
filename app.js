const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1. Middlewares
const app = express();
//A middleware for sending body in the http request
app.use(express.json());
app.use(morgan('dev'));

const port = 3000;

app.use("/api/v1/tours", tourRouter);
app.use('/api/v1/users', userRouter);

// Listening to Server
app.listen(port, () => {
  console.log(`Server is started`, port);
})