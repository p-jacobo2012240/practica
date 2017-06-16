var express = require('express');
var usuario = require('../model/usuario');
var router = express.Router();

router.get('/autenticar', function(req, res) {
  res.render('default/autenticar', {title: 'Autenticar'});
});

router.get('/registrar', function(req, res) {
  res.render('default/registrar', {title: 'Registrar'});
});

router.get('/salir', function(req, res) {
  res.clearCookie('idUsuario');
  res.clearCookie('nick');
  res.redirect('/');
});

router.post('/autenticar', function(req, res) {
  var data =  {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }

  usuario.autenticar(data, function(err, resultado) {
    if(typeof resultado !== undefined) {
      res.cookie('nick', resultado[0].nick);
      res.cookie('idUsuario', resultado[0].idUsuario);
      res.redirect('/');
    } else {
      res.json({"Mensaje": "No existe usuario"});
    }
  });
});


router.post('/registrar', function(req, res) {
  var data =  {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }
  usuario.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.cookie('nick', resultado.nick);
      res.cookie('idUsuario', resultado.idUsuario);
      res.redirect('/');
    } else {
      res.json({"Mensaje": "No se registro el usuario"});
    }
  });
});




module.exports = router;
