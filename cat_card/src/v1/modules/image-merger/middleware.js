const { TE, to, ERROR, SUCCESS } = require('../../../helper');
const service = require('./service');

module.exports = {

  // This function validate inputs
  validateRequest : async (req, res, next) => {

    try {  
      // there must have request body
      if (!req.body) throw ({ code: 404, errmsg: 'request body must required.' });

      // request body must have messages parameter
      if(!('messages' in req.body)) throw ({ code: 404, errmsg: 'messages array must required.' });

      // messages parameter must be a array
      if(!Array.isArray(req.body.messages)) throw ({ code: 404, errmsg: 'messages should be array.' });

      //atleast 1 message should be availble
      if(req.body.messages.length == 0) throw ({ code: 404, errmsg: 'atleast 1 message should be availble.' });

      // request body must have color parameter
      if(!('color' in req.body)) throw ({ code: 404, errmsg: 'color must required.' });

      // request body must have width parameter
      if(!('width' in req.body)) throw ({ code: 404, errmsg: 'width must required.' });

      // width must be a number
      if(isNaN(req.body.width)) throw ({ code: 404, errmsg: 'width must be a number.' });

      // request body must have height parameter
      if(!('height' in req.body)) throw ({ code: 404, errmsg: 'height must required.' });

       // height must be a number
      if(isNaN(req.body.height)) throw ({ code: 404, errmsg: 'height must be a number.' });

      // request body must have size parameter
      if(!('size' in req.body)) throw ({ code: 404, errmsg: 'size must required.' });

      // height must be a number
      if(isNaN(req.body.size)) throw ({ code: 404, errmsg: 'size must be a number.' });
  
      next();
  
    } catch (error) {
  
      ERROR(res, error);
    }
  },

  // this function prepair image get request objects and get images according to message array
  getImages : async (req, res, next) => {

    try {  
      // gatting images according to request
      const images = await service.getImages(req.body);

      req.images = images;
  
      next();
  
    } catch (error) {
  
      ERROR(res, error);
    }
  },
};