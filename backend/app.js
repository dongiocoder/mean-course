const path = require ('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');

const postsroutes = require('./routes/posts');
const userroutes = require('./routes/user');
const app = express();

mongoose.set('useCreateIndex', true)
mongoose.connect(
  "mongodb+srv://mongo-adm:" +
  process.env.MONGO_ATLAS_PW +
  "@cluster0-lb7gt.mongodb.net/node-angular?retryWrites=true",
  { useNewUrlParser: true },
  )
  .then(()=> {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join("backend/images")));
app.use(cors());

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
app.use('/api/user', userroutes);

module.exports = app;
