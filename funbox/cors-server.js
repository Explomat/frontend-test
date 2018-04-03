var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 8081;

var corsProxy = require('cors-anywhere');
corsProxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['Origin', 'X-Requested-With'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});