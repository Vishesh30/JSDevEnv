// Used to configure Web Server
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression'; // for gzip compression


const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../dist/index.html'));
});

//below code is moved to seperate app and deplyed to heroku
// app.get('/users', function(req, res) {
//   // Hard coding for simplicity. Pretend this hits a real database
//   res.json([
//     {"id": 1,"firstName":"user1","lastName":"lname1","email":"user1@gmail.com"},
//     {"id": 2,"firstName":"user2","lastName":"lname2","email":"user2@yahoo.com"},
//     {"id": 3,"firstName":"user2","lastName":"lname3","email":"user3@hotmail.com"}
//   ]);
// });

app.listen(port,function(err){
  if(err){
    console.log(err); // eslint-disable-line no-console
  }else{
    open('http://localhost:' + port);
  }
})
