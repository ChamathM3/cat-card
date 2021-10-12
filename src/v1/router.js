const express = require('express');

const { ImageMergerRoute } = require('./modules/image-merger');

const router = express.Router();

router.route('/').get((req, res) => {

  res.status(200).json({

    message: 'Awesome :-), Image Merger v1 API server is working properly',

    application: process.env.APP_NAME,

    version: process.env.VERSION
  });
});


// Module routing

router.use('/image-generator', ImageMergerRoute);


module.exports = router;
