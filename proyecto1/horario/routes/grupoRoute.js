var express = require('express');
var grupo = require('../model/grupo');
var router = express.Router();

router.get('/api/grupo', function(req, res) {
  grupo.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay grupos"});
    }
  });
});

router.get('/api/grupo/:idGrupo', function(req, res) {
  var idGrupo = req.params.idGrupo;

  grupo.select(idGrupo, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay grupos"});
    }
  });
});

router.post('/api/grupo', function(req, res) {
  var data = {
    nombreGrupo : req.body.nombreGrupo
  }
  grupo.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idGrupo = resultado.insertId;
      res.redirect("api/grupo/" + idGrupo);
    } else {
      res.json({"Mensaje": "No se inserto ningun grupo"});
    }
  });
});

router.put('/api/grupo/:idGrupo', function(req, res) {
  var idGrupo = req.params.idGrupo;
  var data = {
    idGrupo : req.body.idGrupo,
    nombreGrupo: req.body.nombreGrupo
  }

  if(idGrupo === data.idGrupo) {
    grupo.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico ningun grupo"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/grupo/:idGrupo', function(req, res) {
    var idGrupo = req.params.idGrupo;

    grupo.delete(idGrupo, function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/grupo");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = router;
