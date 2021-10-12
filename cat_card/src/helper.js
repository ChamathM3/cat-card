// ##################################################################
// #  File Name: helper.js                                          #
// #                                                                #
// #  Description: helper have a two function to and TE             #
// #                                                                #
// #  Ex:- to()                                                     #
// #  const [err, result] = await to(Call Promise function);        #
// #                                                                #
// #  Commented By: Chamath Madusanka                               #
// ##################################################################

const Errors = require('./errors');


/**
 * String error code mapper
 * Convert string error code to number error code
 */
const ERROR_CODE = {

  ECONNRESET: (e) => { e.code = 4001; return e; },

  error_system: (e) => { e.code = 5001; return e; },

  ACCESS_DENIED: (e) => { e.code = 4011; return e; },
};

/**
 * 
 * @param {*} e - Error object
 * If error code is string, call string error code mapper
 * And Return error object
 */
const parseError = (e) => {

  if (typeof e.code === 'string') {
    return ERROR_CODE[e.code](e);
  }

  return e;

};

/**
 * Convert promise call result to array
 * @param {Promise} promise - promise object
 * 
 * @returns {[]} Return [err, data] array
 */
const to = (promise) => {

  return promise

    .then(data => {

      return [null, data];
    }).catch(err =>

      [err]
    );
};

/**
 * Throw error and if isLog is true, create a log
 * @param {*} err - Any kind of error
 * @param {boolean} isLog - Error log or not
 */
const TE = (err, isLog = false) => {

  if (isLog) {

    console.error(err);
  }

  throw err;
};

/**
 * Create succes response
 * @param {Response} res - Response object
 * @param {number} code - Http Sucess code
 * @param {*} data - Final result. object, array ...
 * @return {Object} Return HTTP Response: {
 *  code: 200,
 *  data: (*),
 *  success: true
 * }
 */
const SUCCESS = (res, code, data, span = null) => {

  return res.status(code).json({

    code: code,

    data: data,

    success: true
  });
};

/**
 * Create error response
 * @param {Response} res - Response object
 * @param {Object} error - Error object
 * @return {Object} Return HTTP Response
 */
const ERROR = (res, error, span = null) => {

  try {

    error = error ? error : {};

    error = error.error ? error.error : error;

    error = error.error ? error.error : error;

    if (error && error.code) {

      error = parseError(error);

      const response = Errors[error.code](error);

      return res.status(response.code).json(response);
    }

    const response = Errors[500](error);


    return res.status(500).json(response);

  } catch (catchErr) {

    console.log('****', error);

    const response = Errors[400](error);


    return res.status(400).json(response);
  }
};

const parseToObject = (value) => {
  try { return JSON.parse(value); } catch { return value; }
};

/**
 * @module helper
 */
module.exports = {
  to,
  TE,
  SUCCESS,
  ERROR,
  parseToObject
};