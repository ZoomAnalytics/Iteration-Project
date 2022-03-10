/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Class = require('./Model/model');

const databaseController = {};

databaseController.getClasses = async (req, res, next) => {
  // 2022-03-09
  const meetingsArr = [];
  const { selectedDate } = req.params;
  const foundClass = await Class.find({ date: { $regex: `.*${selectedDate}.*` } });
  // console.log(foundClass);
  // res.locals.foundClass = foundClass;
  for (let i = 0; i < foundClass.length; i += 1) {
    let { date, roster, attendance } = foundClass[i];
    date = date.slice(0, 10);
    const tempObj = { date, roster, attendance };
    meetingsArr.push(tempObj);
  }
  res.locals.meetingsArr = meetingsArr;
  return next();
};

module.exports = databaseController;
