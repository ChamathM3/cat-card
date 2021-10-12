const Controller = require('./controller');

const Routes = require('./routes');

const Service = require('./service');

const Middleware = require('./middleware');

module.exports = {

  ImageMergerController: Controller,

  ImageMergerRoute: Routes,

  ImageMergerService: Service,

  ImageMergerMiddleware: Middleware
};