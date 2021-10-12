const dotEnv = require('dotenv');

const chalk = require('chalk');

const termination = chalk.bold.magenta;

dotEnv.config();

const terminateServer = () => {
  console.log(
    termination('Application terminate due to mismatch environment\n')
  );

  process.exit(0);
};

const ENV_CONFIGURATION = () => {
  try {
    const path = `${APPLICATION.ENV_FILE_PATH}/${APPLICATION.ENV}.json`;

    return require(path);
  } catch (err) {
    console.log(err);

    console.log(`\n********** ENVIRONMENT NOT FOUND **********
      \nPlease follow below step
      \n01. Create development.json, production,json and test.json in /config/env/ 
      \n02. Copy sample content below created all files.
      \n03. Change content
      \n\nNote:- Do you want to run/build development environment, only create development.json\n`);

    terminateServer();
  }
};

const IS_TEST = process.env.NODE_ENV === 'test';

const API_VERSIONS = process.env.API_VERSIONS.split(' ');



const APPLICATION = {
  VERSION: process.env.VERSION,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,

  APP_NAME: process.env.APP_NAME,
  APP_HOST: process.env.HOST,
  APP_KEY: process.env.APP_KEY,
  APP_ENV: process.env.APP_KEY,
  APP_URL: process.env.APP_URL,
  API_VERSIONS: API_VERSIONS,

  ENV_FILE_PATH: process.env.ENV_FILE_PATH,

  IS_TEST: IS_TEST,

  IS_NOT_PROD: process.env.NODE_ENV !== 'production',

};

const SWAGGER = {
  DEFINITION: version => ({
    swagger: '2.0',
    info: {
      title: `Image Merger API ${version}`,
      version: '1.0.0',
      description: 'Endpoints to test the Image merger'
    },
    host: APPLICATION.APP_URL,
    basePath: `/${version}`,
  }),

  APIS: ['image-merger']
};

const BODYPARSER = {
  JSON_PARSER: {
    limit: '50mb'
  },

  URLENCODED: {
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }
};

const ACCESS_HEADERS = {

  ALLOWED_DOMAINS: ENV_CONFIGURATION().ALLOWED_DOMAINS,

  ALLOW_METHODS: ENV_CONFIGURATION().ALLOW_METHODS,

  ALLOW_HEADERS: ENV_CONFIGURATION().ALLOW_HEADERS
};

const IMAGE_LOCATION = ENV_CONFIGURATION().IMAGE_LOCATION



module.exports = {

  APPLICATION,

  BODYPARSER,

  ACCESS_HEADERS,

  SWAGGER,

  IMAGE_LOCATION
};
