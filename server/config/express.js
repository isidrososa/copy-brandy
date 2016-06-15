var morgan = require('morgan'),
    serverStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    favicon = require('serve-favicon');


module.exports = function(app, config) {

  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(favicon(config.rootPath + '/public/dist/img/icons/favicons/favicon.ico'));

  // Set engine views
  app.engine('html', consolidate.swig);
  app.set('view engine', 'html');
  app.set('views', config.rootPath + '/server/views');

  // Serve statics
  // Change build directory and change static files folder
  app.use('/dist', serverStatic(config.rootPath + '/public/dist'));
  app.use('/', serverStatic(config.rootPath + '/public/lib'));
};
