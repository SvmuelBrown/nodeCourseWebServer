const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile(`server.log`, log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.get('/', (req, res) => {
  res.render('root.hbs', {
    pageTitle: "Portfolio",
    welcome: "Welcome to Samuel's Portfolio"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/weather', (req, res) => {
  res.render('weather.hbs', {
    pageTitle: 'Weather'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Current Projects"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to respond'
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});