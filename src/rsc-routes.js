const express = require('express');
const router = express.Router();
const path = require('path');
let baseUrl = require('./config/appcfg').baseUrl;

const assetsBaseUrl = baseUrl + 'assets/'

const baseFilePath = __dirname + '/../assets/'

module.exports = (app) => {
  app.use(assetsBaseUrl + 'api/', express.static(baseFilePath + 'api'));
  app.use(assetsBaseUrl + 'css/', express.static(baseFilePath + 'css'));
  app.use(assetsBaseUrl + 'fonts', express.static(baseFilePath + 'fonts'));
  app.use(assetsBaseUrl + 'ico/', express.static(baseFilePath + 'ico'));
  app.use(assetsBaseUrl + 'img/', express.static(baseFilePath + 'img'));
  app.use(assetsBaseUrl + 'js/', express.static(baseFilePath + 'js'));
  app.use(assetsBaseUrl + 'kbl-css/', express.static(baseFilePath + 'kbl-css'));
  app.use(assetsBaseUrl + 'kbl-img/', express.static(baseFilePath + 'kbl-img'));
  app.use(assetsBaseUrl + 'tools/', express.static(baseFilePath + 'tools'));

  app.use(baseUrl + 'pages/', express.static(__dirname + '/../pages'));

  // app.use(baseUrl + 'public/css', express.static(path.join(__dirname, '/../public/css')));
}
