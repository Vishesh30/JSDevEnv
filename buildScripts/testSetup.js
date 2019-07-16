// Used to tell mocha to transpile the test using babel before mocha runs them
require('babel-register')();

//Disable webpack feature that babel does not understands
require.extensions['.css'] = function(){};
