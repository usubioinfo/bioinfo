const cors = require('cors');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const nunjucks = require('nunjucks');
const sass = require('node-sass-middleware');
const SetAsyncExtension = require('nunjucks-setasync');

// Routes
const resourceRoutes = require('./rsc-routes');

const baseUrl = '/';
const port = 3010;

const app = express();

let nunEnv = nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app
});

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

app.get('/:topLevelPage', (req, res) => {
  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.topLevelPage}.njk`);
});

app.get('/:topLevelPage/:midLevelPage', (req, res) => {
  res.render(__dirname + `/views/pages/${req.params.topLevelPage}/${req.params.midLevelPage}/${req.params.midLevelPage}.njk`);
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

app.listen(port, () => {
  console.log('Backend started on port ' + port);
});
