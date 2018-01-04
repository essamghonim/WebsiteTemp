var express = require('express');
var path = require('path');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname+'/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/pleasework', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.all('/*', function(req, res, next) 
{
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  res.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
