var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var router = express.Router();
var auth = new Autenticacion();

/* GET home page. */
router.get('/', function(req, res, next) {
  auth.autorizar(req);
  res.render(auth.getPath() + 'index');
});

router.get('/cookie/clear', function(req, res) {
  res.clearCookie('nick');
  res.clearCookie('idUsuario');
  res.end("Se eliminaron las cookies");
});

router.get('/cookie/all', function(req, res) {
  res.status(200).send(req.cookies);
});

module.exports = router;
