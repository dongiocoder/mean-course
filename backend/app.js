const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsroutes = require('./routes/posts');
const app = express();

mongoose.connect("mongodb+srv://mongo-adm:qDYNoySK2GiZ44tZ@cluster0-lb7gt.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(()=> {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin", "*");

 res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,"
    );

  res.setHeader(
   "Access-Control-Allow-Methods" ,
   "GET, POST, PUT, PATCH, DELETE, OPTIONS"
   );
  next();
})

app.use('/api/posts', postsroutes);

module.exports = app;
