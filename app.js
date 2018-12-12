const express = require('express');
const path = require('path');
const data = require('./data.json');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views'); // set default views folder
app.use('/static', express.static(path.join(__dirname, 'public'))); // use '/static' as path to static files in public folder

// render index page and set locals to be projects from data.json
app.get('/', (req, res) => {
  const projects = data.projects;
  res.render('index', { projects });
});

// render about page
app.get('/about', (req, res) => {
  res.render('about');
});

// render project page with locals set to project with corresponding id
app.get('/projects/:id', (req, res) => {
  const project = data.projects[req.params.id];
  res.render('project', {project});
});

// if can't find the right route for a request
// throw new error with 404 status
app.use((req, res, next) => {
  const error = new Error('Sorry can\'t find that!');
  error.status = 404;
  throw error;
});

// handle all errors
// log error message and path to console
// render error template with provided error info
app.use((error, req, res, next) => {
  console.log(error.message);
  console.log(`${req.hostname}${req.path} doesn't exist!`);
  res.render('error', {error});
});

app.listen(3000, () => {
  console.log('Listening to port 3000!');
});