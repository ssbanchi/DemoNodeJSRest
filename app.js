/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var fs = require("fs");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


//------ ReadUser ------

app.get('/listUsers', function (req, res) {
   fs.readFile("./users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//----- DeleteUser ------
app.get('/deleteUser', function (req, res) {
	   fs.readFile("./users.json", 'utf8', function (err, data) {
	       data = JSON.parse( data );
	       delete data["user" + 2];
	       
	       console.log( data );
	       res.end( JSON.stringify(data));
	   });
})

//------ ShowDetail ------

app.get('/:id', function (req, res) {
   //read users
   fs.readFile("./users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

//------ AddUser ------

//var user = {
//   "user4" : {
//      "name" : "Bruno",
//      "surname" : "Sacchi",
//      "profession" : "student",
//      "id": 4
//   }
//}
//
//app.get('/addUser', function (req, res) {
//	//read users
//   fs.readFile( "./users.json", 'utf8', function (err, data) {
//	   //add
//       data = JSON.parse( data );
//       data["user4"] = user["user4"];
//       console.log( data );
//       res.end( JSON.stringify(data));
//   });
//})


//-------------------------

// start server on the specified port and binding host
app.listen(appEnv.port, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
