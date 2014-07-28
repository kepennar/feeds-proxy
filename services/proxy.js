var FeedParser = require('feedparser')
, request = require('request')
, Q = require('q')
, config = require('../config.json');


// Initialize requests option with a 30s timeout
var requestOptions = {
	timeout: 30000
}, httpProxy = null, exclusions = null;
// Set the proxy if defined in configuration
if (config.proxy) {
	httpProxy = config.proxy.host + ':' + config.proxy.port;
	if (config.proxy.exclusions) {
		exclusions = new RegExp(config.proxy.exclusions.replace(',', '|'));
	}
}


exports.proxy = function(url, limit) {
	var deferredFeeds = Q.defer()
	,   feedsParser = new FeedParser()
	,	items= [];

	if (!url.toString().match(exclusions)) {
		requestOptions.proxy= httpProxy;
	} else {
		requestOptions.proxy= null;
	}
	requestOptions.uri = url;
	console.log(requestOptions);
	request(requestOptions)
	.on('error', function (error) {
		console.error(error);
		deferredFeeds.reject('Error requesting remote : ' + error);
	})
	.pipe(feedsParser)
	.on('readable', function() {
		// This is where the action is!
		var stream = this
			, meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance,
			, item;

			while (item = stream.read()) {
			//console.log('Title: %s', item.title );
			//console.log('Description: %s', item.description);
			
			items.push(item);
			deferredFeeds.notify(item);
		}
	})
	.on('error', function (error) {
		console.error(error);
		deferredFeeds.reject('Error parsing feeds : ' + error);
	})
	.on('meta', function (meta) {
		console.log('===== %s =====', meta.title);
	})
	.on('end', function(err) {
		if (err) {
			console.log(err, err.stack);
		}
		console.log('There was %s results', items.length);
		// Order by date
		var sortedByDate= items.sort(function(f1,f2){
			return new Date(f2.pubdate) - new Date(f1.pubdate);
		});
		deferredFeeds.resolve(sortedByDate.slice(0, limit));
	});

	
	return deferredFeeds.promise;
};

