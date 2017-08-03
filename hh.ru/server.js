var express = require("express");
var MemoryFS = require("memory-fs");
var path = require('path');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require("webpack");
var webpackConfig  = require("./webpack.config.js");

var app = express();
var compiler = webpack(webpackConfig);

var mfs = new MemoryFS();
compiler.outputFileSystem = mfs;

var devMiddlware = webpackDevMiddleware(compiler, {
	hot: true,
	publicPath: "/",
	stats: { colors: true }
});
app.use(devMiddlware);

app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));

app.use('/', function (req, res, next) {
  var filename = path.join(compiler.outputPath, 'index.html');

  res.set('Content-Type','text/html');
  res.send(compiler.outputFileSystem.readFileSync(filename, 'utf8'));
  res.end();
});

app.listen(8080, function () {
	console.log("Listening on port 8080!");
});