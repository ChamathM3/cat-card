const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const router = require('./router');

const v1 = require('./v1');

const { Config } = require('../config');

const { JSON_PARSER, URLENCODED } = Config.BODYPARSER;

const { ALLOW_HEADERS, ALLOWED_DOMAINS, ALLOW_METHODS } = Config.ACCESS_HEADERS;

const accessHeader = (req, res, next) => {

  if (ALLOWED_DOMAINS.indexOf(req.headers.origin) !== -1) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);

    res.header('Access-Control-Allow-Methods', ALLOW_METHODS);

    res.header('Access-Control-Allow-Headers', ALLOW_HEADERS);
  }

  next();
};

app.use(bodyParser.json(JSON_PARSER));

app.use(bodyParser.urlencoded(URLENCODED));

app.use(cookieParser());

app.use(accessHeader);

v1(app);

app.use('/', router);

module.exports = app;