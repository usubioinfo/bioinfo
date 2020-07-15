const cors = require('cors');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const nunjucks = require('nunjucks');
const sass = require('node-sass-middleware');
const SetAsyncExtension = require('nunjucks-setasync');
const rateLimit = require('express-rate-limit');

// Prevent DDoS
// This should be done on every application at KAABiL regardless of how much traffic we get
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// Routes
const resourceRoutes = require('./rsc-routes');

const baseUrl = '/';
const port = 3000;

const app = express();

let nunEnv = nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app
});

// Publications Query


nunEnv.addExtension('SetAsyncExtension', new SetAsyncExtension());

app.use(baseUrl + 'scss', sass({
    /* Options */
    src: path.join(__dirname, 'scss'),
    includePaths: ['scss', 'views'],
    dest: path.join(__dirname, '/../public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(cors());

// Images can be retrieved with http://url/biotec/image/:imagename
require('./rsc-routes')(app);


// Pages
app.get(baseUrl, (req, res) => {
  res.render(__dirname + '/views/pages/home/home.njk');
});

app.get('/publications', (req, res, next) => {
  if (req.query.range) {
    nunEnv.addGlobal(`routerYearRange`, req.query.range);
  } else {
    nunEnv.addGlobal(`routerYearRange`, '2017-2019');
  }

  res.render(__dirname + `/views/pages/publications/publications.njk`, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/publications/conferences', (req, res, next) => {
  if (req.query.range) {
    nunEnv.addGlobal(`routerYearRange`, req.query.range);
  } else {
    nunEnv.addGlobal(`routerYearRange`, '2017-2019');
  }

  res.render(__dirname + `/views/pages/publications/conferences/conferences.njk`, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/events', (req, res, next) => {
  if (req.query.range) {
    nunEnv.addGlobal(`routerEventsYearRange`, req.query.range);
  } else {
    nunEnv.addGlobal(`routerEventsYearRange`, '2020');
  }

  res.render(__dirname + `/views/pages/events/events.njk`, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/:topLevelPage', (req, res, next) => {
  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.topLevelPage}.njk`, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/:topLevelPage/:midLevelPage', (req, res, next) => {
  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.midLevelPage}/${req.params.midLevelPage}.njk`, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

/*
app.get(baseUrl, (req, res) => {
  res.render(__dirname + '/views/pages/index/index.njk');
});

app.get(baseUrl + 'faq', (req, res) => {
  res.render(__dirname + '/views/pages/faq/faq.njk');
});

app.get(baseUrl + 'contact', (req, res) => {
  res.render(__dirname + '/views/pages/contact/contact.njk');
});

// SERVICES
app.get(baseUrl + 'services/', (req, res) => {
  res.render(__dirname + '/views/services/services.njk');
});

app.get(baseUrl + 'services/:servicename', (req, res) => {
  const serviceString = `/views/services/${req.params.servicename}/${req.params.servicename}.njk`;
  res.render(__dirname + serviceString);
});

//RESOURCES
app.get(baseUrl + 'resources/:rscname', (req, res) => {
  const rscString = `/views/resources/${req.params.rscname}/${req.params.rscname}.njk`;
  res.render(__dirname + rscString);
});
*/

// Handle 404s
app.use((err, req, res, next) => {
  console.log(err);
  res.render(__dirname + '/views/pages/err/404/404.njk');
});

app.listen(port, () => {
  console.log('Backend started on port ' + port);
});
