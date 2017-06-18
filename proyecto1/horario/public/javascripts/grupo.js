var Grupo = function() {
  var main = this;
  var grupoUri = "http://localhost:3000/api/grupo";
  main.grupos = ko.observableArray([]);
  main.grupoNuevo = {
        idGrupo: ko.observable(),
        nombreGrupo: ko.observable()
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
        var grupo = {
            nombreGrupo: main.grupoNuevo.nombreGrupo()
        }
        ajaxHelper(grupoUri, 'POST', grupo).done(function (data) {
            main.getAllGrupos();
            $("#modalAgregarGrupo").modal('hide');
        });
    }

  main.getAllGrupos = function() {
    ajaxHelper(grupoUri, 'GET').done(function(data) {
      main.grupos(data);
    });
  }
  main.getAllGrupos();
}

$(document).ready(function() {
  var grupo = new Grupo();
  ko.applyBindings(grupo);
});
