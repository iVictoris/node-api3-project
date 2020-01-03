const moment = require('moment');
/**
 * The purpose of logger is to log to the console following information
 * * req method
 * * req url
 * * timestamp
 * @param {object} req the request object 
 * @param {object} res the response object
 * @param {function} next call this function to continue to the next middleware
 */

const logger = ({method, originalUrl}, res, next) => {
  const timestamp = moment().format('MM/DD/YYYY::hh:mm:ss');

  const log = `[${timestamp}] -- ${method} ${originalUrl}`
  console.log(log)
  next();
}

module.exports = logger;