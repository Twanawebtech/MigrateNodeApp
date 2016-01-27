var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
// connect to DB
function initDBConnection() {

  if(process.env.VCAP_SERVICES) {
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    if(vcapServices.cloudantNoSQLDB) {
      dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
      dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
      dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
      dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
      dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;

      cloudant = require('cloudant')(dbCredentials.url);

      // check if DB exists if not create
      cloudant.db.create(dbCredentials.dbName, function (err, res) {
        if (err) { console.log('could not create db ', err); }
      });

      db = cloudant.use(dbCredentials.dbName);

    } else {
      console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
    }
  } else{
    console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
    // For running this app locally you can get your Cloudant credentials
    // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
    // Variables section for an app in the Bluemix console dashboard).
    // Alternately you could point to a local database here instead of a
    // Bluemix service.
    //dbCredentials.host = "REPLACE ME";
    //dbCredentials.port = REPLACE ME;
    //dbCredentials.user = "REPLACE ME";
    //dbCredentials.password = "REPLACE ME";
    //dbCredentials.url = "REPLACE ME";
  }
}

initDBConnection();

*/

//var data = require('./data.json');
app.locals.appdata = require('./data.json');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
