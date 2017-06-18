var database = require('./database');
var grupo = {};

grupo.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Grupo",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });
  }
}

grupo.select = function(idGrupo, callback) {
  if(database) {
    var consulta = "SELECT * FROM Grupo WHERE idGrupo = ?";
    database.query(consulta,idGrupo, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

grupo.insert = function(data, callback) {
  if(database) {
    var consulta = "CALL P_addGrupo(?)";
    database.query(consulta, data.nombreGrupo, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

module.exports = grupo;
