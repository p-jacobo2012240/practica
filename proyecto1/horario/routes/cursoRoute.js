var express = require('express');
var curso = require('../model/curso');
var router = express.Router();

router.get('/api/curso', function(req, res) {
  curso.selectAll(function(error, resultados){
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay cursos"});
    }
  });
});

router.get('/api/curso/:idCurso', function(req, res) {
  var idCurso = req.params.idCurso;

  curso.select(idCurso, function(error, resultado){
    if (typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"Mensaje": "No hay cursos"});
    }
  });
});

router.post('/api/curso', function(req, res) {
  var data = {
    nombreCurso : req.body.nombreCurso
  }
  curso.insert(data, function(error, resultado){
    if (resultado && resultado.insertId > 0) {
      var idCurso = resultado.insertId;
      res.redirect("api/curso/" + idCurso);
    } else {
      res.json({"Mensaje": "No se inserto ningun curso"});
    }
  });
});

router.put('/api/curso/:idCurso', function(req, res) {
  var idCurso = req.params.idCurso;
  var data = {
    idCurso : req.body.idCurso,
    nombreCurso: req.body.nombreCurso
  }

  if(idCurso === data.idCurso) {
    curso.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico ningun curso"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/curso/:idCurso', function(req, res) {
    var idCurso = req.params.idCurso;

    curso.delete(idCurso, function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/curso");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = router;
