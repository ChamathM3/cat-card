const express = require('express');

const router = express.Router();

const Controller = require('./controller');

const Middleware = require('./middleware');

router.route('/test').get(Controller.test);
// this route will generate cats images with some texts
router.post('/create-image',
  Middleware.validateRequest,
  Middleware.getImages,
  Controller.generateMainImage
);

module.exports = router;