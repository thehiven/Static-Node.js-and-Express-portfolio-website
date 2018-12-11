const express = require('express');
const path = require('path');
const data = require('./data.json');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const projects = data.projects;
  res.render('index', { projects });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res) => {
  const project = data.projects[req.params.id];
  res.render('project', {project});
});

app.use((req, res, next) => {
  const error = new Error('Sorry can\'t find that!');
  error.status = 404;
  throw error;
});

app.use((error, req, res, next) => {
  console.log(error.message);
  console.log(`${req.hostname}${req.path} doesn't exist!`);
  res.render('error', {error});
});

app.listen(3000, () => {
  console.log('Listening to port 3000!');
});