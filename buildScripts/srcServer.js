// Used to configure Web Server

// var express = require('express');
// var path = require('path');
// var open = require('open'); // used to open the site in browser

import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';                      // included to use webpack
import config from '../webpack.config.dev';         // included pick up webpack config file

const port = 3000;
const app = express();
//create webpack instance and use config
const compiler = webpack(config);

//below is used to tell express to use webpack
app.use(require('webpack-dev-middleware')(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../src/index.html'));
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"user1","lastName":"lname1","email":"user1@gmail.com"},
    {"id": 2,"firstName":"user2","lastName":"lname2","email":"user2@yahoo.com"},
    {"id": 3,"firstName":"user2","lastName":"lname3","email":"user3@hotmail.com"}
  ]);
});

app.listen(port,function(err){
  if(err){
    console.log(err); // eslint-disable-line no-console
  }else{
    open('http://localhost:' + port);
  }
})
