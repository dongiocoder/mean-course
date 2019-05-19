const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );

  res.setHeader(
   "Access-Control-Allow-Methods" ,
   "GET, POST, PATCH, DELETE, OPTIONS"
   );

  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "post addedd successfully"
  })
});

app.get('/api/posts', (_req, res, _next) => {
  const posts = [
    {
      id: 'fadf12421l',
      title: 'First server side post',
      content: 'This is coming from the server'
    },
    {
      id: 'fadf15421l',
      title: 'Second server side post',
      content: 'This is coming from the server again'
      },
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
