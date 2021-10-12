// ##################################################################
// #  File name: error.js                                           #
// #                                                                #
// #  Description:                                                  #
// #  Mapping custom error code converted below object structure    #
// #                                                                #
// #  Return Error: {                                               #
// #    code: 400,                                                  #
// #    message: 'BAD_REQUEST',                                     #
// #    success: false,                                             #
// #    error: {                                                    #
// #      errmsg: 'Error',                                          #
// #      code: 40001,                                              #
// #      errLogs; []                                               #
// #    }                                                           #
// #  }                                                             #
//                                                                  #
// #  Commented By: Chamath Madusanka                               #
// ##################################################################

/**
 * Create a structural error object
 * @private
 * @param {number} code - Http error code, ex:- 400,.., 500 
 * @param {string} message - String error code
 * @param {(Object|string)} e - Error Object or string error
 * @param {string} e.code - Custom error code or system error code,
 * @param {string} e.errmsg - Error message
 * @param {[*]} e.errLogs - Error logs list
 * 
 * @returns {Object} Return structural error object (Please check top of file) 
 */
const error = (code, message, e) => {

  e = e.errmsg ? e : parseError(code, e);

  return {

    code: code,

    message: message,

    ...getError(e)
  };
};

/**
 * System obtained different error formats,Below function Convert that error to above format
 * @private
 * @param {number} code - Http error code, ex:- 400,.., 500 
 * @param {(Object|string)} e - Error Object or string error
 * @param {string} e.code - Custom error code or system error code,
 * @param {string} e.message - Error message
 * @param {[*]} e.errLogs - Error logs list
 * 
 * @returns {Object} Return {
 *  code: 4001,
 *  errmsg: 'test Error',
 *  errlogs: []
 * }
 */
const parseError = (code, e) => {

  const isErrString = typeof e === 'string';

  const errmsg = isErrString ? e : e.message;

  const errLogs = isErrString ? [] : e.errLogs;

  return {

    code: e.code ? e.code : code,

    errmsg: errmsg,

    errLogs: errLogs ? errLogs : []
  };
};

/**
 * Bind success=false and Return structural error object
 * @private
 * @param {Object} e - Structural error Object
 * @param {string} e.code - Custom error code or system error code,
 * @param {string} e.errmsg - Error message
 * @param {[*]} e.errLogs - Error logs list
 * 
 * @returns {Object} Return {
 *  success: false,
 *  error: {
 *    code: 4001,
 *    errmsg: 'test Error',
 *    errlogs: []
 *  }
 * }
 */
const getError = e => ({ success: false, error: e });

/**
 * @module Object Error mapping Object,
 * This Object have a custom error code and maped to every system errors
 * Ex:-
 * HTTP CODE 400
 * Custom Error code start 4000, 4001, 4002 .... 4009, 40001, ..
 * We cant can't use 4010, because it is 401 series
 */
const Errors = {

  // 400 Series
  400: e => error(400, 'BAD_REQUEST', e),
  4000: e => error(400, 'BAD_REQUEST', e),
  4001: e => error(400, 'ECONNRESET', e),
  4002: e => error(400, 'ERR_MISSING_PARAMS', e),
  4003: e => error(400, 'ERR_INVALID_DOMAIN', e),
  4004: e => error(400, 'ERR_INVALID_DATE', e),

  // 404 Series
  404: e => error(404, 'NOT_FOUND', e),

  // 500 Series
  500: e => error(500, 'INTERNAL_SERVER_ERROR', e),
  5001: e => error(400, 'ERROR_SYSTEM', e),

  // 401 Series
  4011: e => error(401, 'ACCESS_DENIED', e),

  // Sepecial Series
  11000: e => error(400, 'DUPLICATION_KEY_ERROR_COLLECTION', e),
  26: e => error(400, 'NS_NOT_FOUND', e)
};

module.exports = Errors;