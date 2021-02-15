const cors = require('cors');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const nunjucks = require('nunjucks');
const sass = require('node-sass-middleware');
const SetAsyncExtension = require('nunjucks-setasync');
const rateLimit = require('express-rate-limit');

const assetPath = path.resolve(__dirname, '../assets');
console.log(__dirname);

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


nunEnv.addGlobal(`RaikouServer`, 'http://bioinfocore.usu.edu/raikou');


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

let routeDict = {
  home: 'home',
  research: 'research',
  people: 'people',
  publications: 'research',
  tools: 'tools',
  events: 'news',
  news: 'news'
}

// Pages
app.get(baseUrl, (req, res) => {
  let data = {
    activeRoute: routeDict['home']
  }

  res.render(__dirname + '/views/pages/home/home.njk', data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/assets/header-img', (req, res, next) => {
  const date = new Date();
  if (date.getMonth() <= 1 || date.getMonth() >= 10) {
    return res.sendFile(`${assetPath}/kbl-img/usuwinter.jpeg`);
  }

  return res.sendFile(`${assetPath}/kbl-img/ususpring6.jpg`);
});

// Default browser behaviour fix
app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(404);
})

app.get('/publications', (req, res, next) => {
  let routerYearRange = '2020-2021';

  if (req.query.range) {
    routerYearRange = req.query.range;
  }

  let data = {
    routerYearRange,
    activeRoute: routeDict['publications']
  };

  res.render(__dirname + `/views/pages/publications/publications.njk`, data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/publications/conferences', (req, res, next) => {
  let routerYearRange = '2020-2021';
  if (req.query.range) {
    routerYearRange = req.query.range;
  }

  let data = {
    routerYearRange,
    activeRoute: routeDict['publications']
  };

  res.render(__dirname + `/views/pages/publications/conferences/conferences.njk`, data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/events', (req, res, next) => {
  let routerEventsYearRange = '2021';
  if (req.query.range) {
    routerEventsYearRange = req.query.range;
  }

  let data = {
    routerEventsYearRange,
    activeRoute: routeDict['events']
  };

  res.render(__dirname + `/views/pages/events/events.njk`, data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/:topLevelPage', (req, res, next) => {
  let data = {activeRoute: routeDict[req.params.topLevelPage]};

  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.topLevelPage}.njk`, data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

app.get('/:topLevelPage/:midLevelPage', (req, res, next) => {
  let data = {activeRoute: routeDict[req.params.topLevelPage]};

  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.midLevelPage}/${req.params.midLevelPage}.njk`, data, (err, html) => {
    if (err) return next(err);
    res.send(html);
  });
});

// Handle 404s
app.use((err, req, res, next) => {
  console.log(err);
  let data = {activeRoute: '404'};
  res.render(__dirname + '/views/pages/err/404/404.njk', data, (err, html) => {
    if (err) console.log(err);
    res.send(html);
  });
});

app.listen(port, () => {
  console.log('Backend started on port ' + port);
});
