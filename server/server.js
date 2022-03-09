const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const serverController = require('./ServerController');

const MONGO_URI = 'mongodb+srv://jamesma1:VZWvrVKGgbtcKiPc@cluster0.gscd4.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'zoomData',
  // sets the name of the DB that our collections are part of
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index'));
});

app.get(
  '/api/home',
  serverController.getAuthCode,
  serverController.getAccessToken,
  serverController.getMeetingID,
  serverController.getUUID,
  serverController.getParticipants,
  (req, res) => {
    console.log('final endpoint handler');
    // res.send(res.locals.participants);
    res.redirect('/');
    // res.send(res.locals.UUID);
  },
);

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.status(404).send('404 Error'));

/**
 * express error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

// module.exports = app;
