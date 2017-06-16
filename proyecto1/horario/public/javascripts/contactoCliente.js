var ContactoCliente = function() {
  var main = this;
  var contactoUri = "http://localhost:3000/api/contacto";
  main.contactos = ko.observableArray([]);

  function ajaxHelper(uri, method, data) {
    return $.ajax({
      url : uri,
      type: method,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    })
  }

  main.getAllContactos = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data) {
      main.contactos(data);
    });
  }

  main.getAllContactos();
}

$(document).ready(function() {
  var contacto = new ContactoCliente();
  ko.applyBindings(contacto);
});
