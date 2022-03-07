const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const serverController = require('/server/ServerController')



// url: 'mongodb+srv://austinandrews:nc0bYi09qiPGM7tV@cluster0.vhmwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect('mongodb+srv://austinandrews:nc0bYi09qiPGM7tV@cluster0.vhmwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});



/**
 * handle parsing request body
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 /**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api/authToken'), serverController.getAuthToken, (req, res) => {
    res.status(200);
}



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
    const errorObj = Object.assign({}, defaultErr, err);
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

  