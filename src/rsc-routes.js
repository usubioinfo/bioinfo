const express = require('express');
const router = express.Router();
const path = require('path');
let baseUrl = require('./config/appcfg').baseUrl;

const assetsBaseUrl = baseUrl + 'assets/'

const baseFilePath = __dirname + '/../assets/'

module.exports = (app) => {
  app.use(assetsBaseUrl + 'api/', express.static(baseFilePath + 'api'));
  app.use(assetsBaseUrl + 'fa/', express.static(baseFilePath + 'fa'));
  app.use(assetsBaseUrl + 'css/', express.static(baseFilePath + 'css'));
  app.use(assetsBaseUrl + 'fonts', express.static(baseFilePath + 'fonts'));
  app.use(assetsBaseUrl + 'ico/', express.static(baseFilePath + 'ico'));
  app.use(assetsBaseUrl + 'img/', express.static(baseFilePath + 'img'));
  app.use(assetsBaseUrl + 'js/', express.static(baseFilePath + 'js'));
  app.use(assetsBaseUrl + 'kbl-css/', express.static(baseFilePath + 'kbl-css'));
  app.use(assetsBaseUrl + 'kbl-img/', express.static(baseFilePath + 'kbl-img'));
  app.use(assetsBaseUrl + 'kbl-js/', express.static(baseFilePath + 'kbl-js'));
  app.use(assetsBaseUrl + 'tools/', express.static(baseFilePath + 'tools'));

  app.use(baseUrl + 'pages/', express.static(__dirname + '/../pages'));

  const localWebassets = path.resolve(__dirname, '../../webassets');
  const fs = require('fs');
  if (fs.existsSync(localWebassets)) {
    app.use('/image', (req, res, next) => {
      const reqPath = req.path;
      // 1. Direct file match in webassets
      let directFile = path.join(localWebassets, reqPath);
      if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
        return res.sendFile(directFile);
      }
      // 2. Strip /raw/ or /aspect/ prefix if present
      let stripped = reqPath.replace(/^\/(raw|aspect)\/?/, '/');
      let strippedFile = path.join(localWebassets, stripped);
      if (fs.existsSync(strippedFile) && fs.statSync(strippedFile).isFile()) {
        return res.sendFile(strippedFile);
      }
      // 3. Fallback: redirect to remote RaikouServer
      return res.redirect(`https://bioinfocore.usu.edu/raikou/image${req.url}`);
    });
  }
}
