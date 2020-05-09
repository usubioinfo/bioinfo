const express = require('express');
const router = express.Router();
const path = require('path');
const baseUrl = require('./config/appcfg').baseUrl;
console.log(baseUrl)

const baseFilePath = __dirname + '/../assets/'

module.exports = (app) => {
  app.use(baseUrl + 'images/', express.static(baseFilePath + 'images'));
  app.use(baseUrl + 'api/', express.static(baseFilePath + 'api'));
  app.use(baseUrl + 'css/', express.static(baseFilePath + 'css'));
  app.use(baseUrl + 'fonts', express.static(baseFilePath + 'fonts'));
  app.use(baseUrl + 'img/', express.static(baseFilePath + 'img'));
  app.use(baseUrl + 'js/', express.static(baseFilePath + 'js'));
  app.use(baseUrl + 'kbl-css/', express.static(baseFilePath + 'kbl-css'));
  app.use(baseUrl + 'kbl-img/', express.static(baseFilePath + 'kbl-img'));
  app.use(baseUrl + 'tools/', express.static(baseFilePath + 'tools'));

  // app.use(baseUrl + 'public/css', express.static(path.join(__dirname, '/../public/css')));
}
