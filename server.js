var express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    chalk = require('chalk');

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/routes/index.server.routes')(app);

app.listen(config.port);

console.log(chalk.blue('Server running on port: ' + config.port));
