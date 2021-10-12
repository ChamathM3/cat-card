const express = require('express');

const router = express.Router();

const V1Router = require('./v1/router');


router.route('/').get(function (req, res) {

  res.status(200).json({

    message: 'Awesome :-), Image merger server is working properly',

    application: process.env.APP_NAME,

    version: process.env.VERSION
  });
});

router.use('/v1', V1Router);

// 404
router.use(function (req, res) {
  res.status(404).json({
    code: 404, message: 'NOT_FOUND', success: false, error: {
      errmsg: 'Route' + req.url + ' Not found.',
      code: 404
    }
  });
});

// 500 - Any server error
router.use(function (err, req, res) {
  res.status(500).send({ code: 500, error: err });
});

module.exports = router;
