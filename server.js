//requires
var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');

// setup config for the pool
var config = {
  database: 'tasklist',
  host: 'localhost',
  port: 5432,
  max: 12
}; // end config

// create new pool using this config
var pool = new pg.Pool( config );

//uses
app.use(express.static('public'));
app.use( bodyParser.urlencoded( { extended: true } ) );

//spin up server
app.listen(3003, function(){
  console.log('server on:', 3003);
});

//routes
// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  // send back index.html as response
  res.sendFile( path.resolve('public/index.html'));//path so server knows where to get static files
}); // end base url

//respond to get request for task list db
app.get ('/allTasks', function(req,res){
  console.log('hit allTasks');
  var allTasks = [];
  pool.connect(function(err, connection, done){
    if(err) {
      console.log('err');
      res.send(400);
    } else {
      console.log('connected to db');
      var resultSet = connection.query( "SELECT * from tasks" );
      resultSet.on( 'row', function( row ){
        allTasks.push( row );
        console.log(allTasks);
      });
      resultSet.on( 'end', function(){
        done();
        res.send(allTasks);// res.send array of allTasks
      }); //end on end
    }
  });//end pool
});

//add a task to db and send back to post on dom
app.post( '/addTask', function( req, res ){
  console.log( 'hit taskList url' );
  pool.connect( function(err, connection, done) {
    if(err) {
      console.log('err');
      res.send( 400 );
    } else {
      console.log('connected to db');
      //need req.body
      connection.query( "INSERT INTO tasks (task) VALUES ('"+req.body.taskInput+"')");
      done();
    } //end on end
  }); //end pool
  res.send(200);
});

//update upon task check, db complete change to true
app.post( '/checkTask', function( req, res ){
  console.log( 'hit taskList url' );
  pool.connect( function(err, connection, done) {
    if(err) {
      console.log('err');
      res.send( 400 );
    } else {
      console.log('connected to db');
        connection.query('UPDATE tasks set active='+req.body.active+' WHERE id='+req.body.id);//need req.body
      done();
    } //end on end
  }); //end pool
  res.send(200);
});

//update upon delete click, db delete id row
app.post( '/deleteTask', function( req, res ){
  console.log( 'hit deleteTask url' );
  pool.connect( function(err, connection, done) {
    if(err) {
      console.log('err');
      res.send( 400 );
    } else {
      console.log('connected to db');
        connection.query('DELETE from tasks WHERE id='+req.body.id);//need req.body
      done();
    } //end on end
  }); //end pool
  res.send(200);
});
