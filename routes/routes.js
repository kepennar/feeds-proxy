
/*
 * GET home page.
 */
var proxyService = require('../services/proxy');

 exports.index = function(req, res) {
 	res.render('index', { title: 'Feeds Proxy' });
 };

 exports.api = function(req, res) {
 	var url = req.query.q;
 	if (!isDefinedParam(url)) {
 		return res.send(400, 'Invalid feed url');

 	}
 	var limit = 20;
 	if (isDefinedParam(req.query.limit)) {
 		limit = req.query.limit;
 	}
 	console.log('Url %s, limit %s', url, limit);
 	proxyService.proxy(url, limit)
 	.fail(function (error) {
 		res.send(500, error);
 	})
 	.done(function(items) {
 		res.send(200, items);
 	});
 };

 var isDefinedParam = function(param) {
 	return (param !== null && param && param.trim());
 }
