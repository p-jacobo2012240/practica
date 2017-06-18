var Curso = function() {
  var main = this;
  var cursoUri = "http://localhost:3000/api/curso";
  main.cursos = ko.observableArray([]);
  main.cursoNuevo = {
        idCurso: ko.observable(),
        nombreCurso: ko.observable()
    }

  function ajaxHelper(uri, method, data) {
  return $.ajax({
    url: uri,
    type: method,
    dataType: 'json',
    contentType: 'application/json',
    data: data ? JSON.stringify(data) : null
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

  main.agregar = function () {
        var curso = {
            nombreCurso: main.cursoNuevo.nombreCurso()
        }
        ajaxHelper(cursoUri, 'POST', curso).done(function (data) {
            main.getAllCursos();
            $("#modalAgregarCurso").modal('hide');
        });
    }

  main.getAllCursos = function() {
    ajaxHelper(cursoUri, 'GET').done(function(data) {
      main.cursos(data);
    });
  }
  main.getAllCursos();
}

$(document).ready(function() {
  var curso = new Curso();
  ko.applyBindings(curso);
});
