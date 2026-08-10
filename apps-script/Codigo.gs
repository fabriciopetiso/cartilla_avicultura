/**
 * Backend de la cartilla avícola.
 *
 * El sitio es estático (GitHub Pages), así que no hay servidor propio donde
 * guardar los datos. Este script vive dentro de una planilla de Google y se
 * publica como aplicación web: index.html le hace POST y él escribe la fila.
 *
 * Recibe dos tipos de mensaje, distinguidos por el campo "tipo":
 *   registro  → alguien se registra para habilitar las descargas
 *   consulta  → alguien escribe un comentario o pregunta
 *
 * Cada tipo va a su propia hoja, que se crea sola la primera vez.
 *
 * Instrucciones de despliegue: ver README.md en esta misma carpeta.
 */

var HOJAS = {
  registro: ['fecha', 'nombre', 'mail', 'localidad', 'organizacion', 'archivo'],
  consulta: ['fecha', 'nombre', 'mail', 'texto']
};

function doPost(e) {
  try {
    // El navegador manda el cuerpo como text/plain para evitar el preflight
    // CORS, que la aplicación web de Apps Script no sabe responder.
    var datos = JSON.parse(e.postData.contents);
    var tipo = datos.tipo === 'consulta' ? 'consulta' : 'registro';

    var hoja = obtenerHoja(tipo);
    var fila = HOJAS[tipo].map(function (columna) {
      return columna === 'fecha' ? new Date() : (datos[columna] || '');
    });
    hoja.appendRow(fila);

    return responder({ ok: true });
  } catch (err) {
    // Se registra en el log de ejecuciones de Apps Script para poder revisarlo.
    console.error('Error al guardar: ' + err);
    return responder({ ok: false, error: String(err) });
  }
}

/** Permite abrir la URL /exec en el navegador para comprobar que responde. */
function doGet() {
  return responder({ ok: true, mensaje: 'Backend de la cartilla avícola activo.' });
}

function obtenerHoja(tipo) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(tipo);
  if (!hoja) {
    hoja = libro.insertSheet(tipo);
    hoja.appendRow(HOJAS[tipo]);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function responder(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
