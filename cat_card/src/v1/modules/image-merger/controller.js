const service = require('./service');

const { SUCCESS, ERROR, TE, to } = require('../../../helper');

const test = (req, res) => {

  try {

    const { testValue } = req.query;

    const result = `Image merger is working - Test value: ${testValue}`;

    SUCCESS(res, 200, result, req.span);

  } catch (error) {

    ERROR(res, error, req.span);
  }
};



const generateMainImage = async (req, res) => {

  try {

    const { images } = req;

    const [err, result] = await to(service.makeMainImage(images, req.body));

    if (err) TE(err);

    SUCCESS(res, 200, "image saved.", req.span);

  } catch (error) {

    ERROR(res, error, req.span);
  }
};

module.exports = {

  test,

  generateMainImage
};