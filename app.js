
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes/routes')
 , http = require('http')
 , path = require('path');

 var app = express();


//CORS middleware
var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}


app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(allowCrossDomain);
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);
	
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

process.on('uncaughtException', function (err) {
  console.error('uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})

app.get('/', routes.index);
app.get('/api', routes.api);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}
function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: err });
	} else {
		next(err);
	}
}
function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}
