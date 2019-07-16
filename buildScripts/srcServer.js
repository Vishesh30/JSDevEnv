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
})

app.listen(port,function(err){
  if(err){
    console.log(err);
  }else{
    open('http://localhost:' + port);
  }
})
