const app = require('./app');

// Listening to Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is started`, port);
})