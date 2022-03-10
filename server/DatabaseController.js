/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Class = require('./Model/model');

const databaseController = {};

databaseController.getClasses = (req, res, next) => {
  // 2022-03-09
  const { date } = req.params;

};

module.exports = databaseController;
