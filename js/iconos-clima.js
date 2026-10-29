// Lo explica: Ailin
// Chicos, estos íconos del clima los dibujamos nosotros en SVG (un dibujo hecho con código).
// Todos usan los mismos colores y el mismo grosor de línea, así se ven como un solo juego.

var SOL = '<g stroke="#f4b73c" stroke-width="4" stroke-linecap="round">' +
  '<line x1="49" y1="32" x2="55" y2="32"/><line x1="44" y1="44" x2="48.3" y2="48.3"/>' +
  '<line x1="32" y1="49" x2="32" y2="55"/><line x1="20" y1="44" x2="15.7" y2="48.3"/>' +
  '<line x1="15" y1="32" x2="9" y2="32"/><line x1="20" y1="20" x2="15.7" y2="15.7"/>' +
  '<line x1="32" y1="15" x2="32" y2="9"/><line x1="44" y1="20" x2="48.3" y2="15.7"/></g>' +
  '<circle cx="32" cy="32" r="11" fill="#f9cf5c" stroke="#e8a521" stroke-width="2.5"/>';

var SOL_CHICO = '<g stroke="#f4b73c" stroke-width="3.5" stroke-linecap="round">' +
  '<line x1="24" y1="10" x2="24" y2="5"/><line x1="14" y1="14" x2="10.5" y2="10.5"/>' +
  '<line x1="10" y1="24" x2="5" y2="24"/><line x1="34" y1="14" x2="37.5" y2="10.5"/>' +
  '<line x1="14" y1="34" x2="10.5" y2="37.5"/></g>' +
  '<circle cx="24" cy="24" r="9.5" fill="#f9cf5c" stroke="#e8a521" stroke-width="2.5"/>';

var NUBE_CHICA = '<path d="M27 53h21a8.5 8.5 0 0 0 1.4-16.9A11.5 11.5 0 0 0 28.2 33.4 9.8 9.8 0 0 0 27 53z" fill="#f1f4f1" stroke="#8e9a93" stroke-width="2.5" stroke-linejoin="round"/>';

var NUBE = '<path d="M21 50h25a10 10 0 0 0 1.6-19.9A13.5 13.5 0 0 0 22.4 27.4 11.3 11.3 0 0 0 21 50z" fill="#f1f4f1" stroke="#8e9a93" stroke-width="2.5" stroke-linejoin="round"/>';

var NUBE_ARRIBA = '<path d="M21 40h25a10 10 0 0 0 1.6-19.9A13.5 13.5 0 0 0 22.4 17.4 11.3 11.3 0 0 0 21 40z" fill="#f1f4f1" stroke="#8e9a93" stroke-width="2.5" stroke-linejoin="round"/>';

var GOTAS = '<g stroke="#3b8fd0" stroke-width="3.5" stroke-linecap="round">' +
  '<line x1="24" y1="47" x2="21" y2="55"/><line x1="34" y1="47" x2="31" y2="55"/><line x1="44" y1="47" x2="41" y2="55"/></g>';

var RAYO = '<path d="M35 42l-7 10h6l-3 9 10-13h-6l3-6z" fill="#f4b73c" stroke="#e8a521" stroke-width="1.5" stroke-linejoin="round"/>';

var COPOS = '<g fill="#8fbfe6"><circle cx="23" cy="50" r="2.8"/><circle cx="33" cy="55" r="2.8"/><circle cx="43" cy="50" r="2.8"/></g>';

function dibujoDelClima(descripcion) {
  var texto = (descripcion || "").toLowerCase();

  if (texto.indexOf("tormenta") !== -1) {
    return NUBE_ARRIBA + RAYO;
  }
  if (texto.indexOf("lluvia") !== -1 || texto.indexOf("llovizna") !== -1 || texto.indexOf("chubasco") !== -1) {
    return NUBE_ARRIBA + GOTAS;
  }
  if (texto.indexOf("nieve") !== -1 || texto.indexOf("nevada") !== -1) {
    return NUBE_ARRIBA + COPOS;
  }
  if (texto.indexOf("parcial") !== -1 || texto.indexOf("mayormente") !== -1) {
    return SOL_CHICO + NUBE_CHICA;
  }
  if (texto.indexOf("despejado") !== -1) {
    return SOL;
  }
  if (texto.indexOf("nublado") !== -1) {
    return NUBE;
  }
  return SOL_CHICO + NUBE_CHICA;
}

function iconoDelClima(descripcion) {
  return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' + dibujoDelClima(descripcion) + '</svg>';
}
