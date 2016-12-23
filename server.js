var express        = require( 'express' );
var app            = express(); // create our app w/ express
var bodyParser     = require( 'body-parser' );    // pull information from HTML POST (express4)
var methodOverride = require( 'method-override' ); // simulate DELETE and PUT (express4)
// configuration =================

app.use( express.static( 'client' ) );                 // set the static files location /public/img will be /img for users
// app.use( morgan( 'dev' ) );                                         // log every request to the console
app.use( bodyParser.urlencoded( { 'extended' : 'true' } ) );            // parse application/x-www-form-urlencoded
app.use( bodyParser.json() );                                     // parse application/json
// app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) ); // parse application/vnd.api+json as json
app.use( methodOverride() );
app.use( '/bower_components', express.static( 'bower_components' ) );

// listen (start app with node server.js) ======================================
app.listen( process.env.PORT || 8080 );
console.log( 'App listening on port 8080' );

