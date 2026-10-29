// Lo explica: Godoy
// Chicos, el mapa lo hacemos con Leaflet (una librería gratis). Los dibujos de las calles
// son de OpenStreetMap con el estilo clarito de CARTO. Ponemos un pin en la ciudad con su
// nombre, y el pin cambia de color según la temperatura: azul si hace frío, verde si está
// templado y rojo si hace calor. Si tocás el pin te dice la temperatura.

var UBICACION_INICIAL = { lat: -38.9333, lon: -69.2167, nombre: "Cutral Có" };
var LIMITE_FRIO = 10;
var LIMITE_CALOR = 28;

var mapa = null;
var pinClima = null;

function colorSegunTemperatura(temperatura) {
  if (temperatura === null || temperatura === undefined) {
    return { color: "#9e9e9e", texto: "Esperando datos..." };
  }
  if (temperatura < LIMITE_FRIO) {
    return { color: "#1971c2", texto: "Frío (" + Math.round(temperatura) + "°)" };
  }
  if (temperatura > LIMITE_CALOR) {
    return { color: "#e03131", texto: "Caluroso (" + Math.round(temperatura) + "°)" };
  }
  return { color: "#2e6b34", texto: "Templado (" + Math.round(temperatura) + "°)" };
}

// El pin es un dibujito SVG; le cambiamos el color de relleno.
function iconoPin(color) {
  return L.divIcon({
    className: "mapa-pin",
    html: '<svg width="30" height="40" viewBox="0 0 30 40"><path d="M15 0C6.7 0 0 6.7 0 15c0 11 15 25 15 25s15-14 15-25C30 6.7 23.3 0 15 0z" fill="' + color + '"/><circle cx="15" cy="15" r="6" fill="#fff"/></svg>',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36]
  });
}

function iniciarMapa(idDiv, zoom) {
  if (!document.getElementById(idDiv) || typeof L === "undefined") {
    return;
  }

  mapa = L.map(idDiv).setView([UBICACION_INICIAL.lat, UBICACION_INICIAL.lon], zoom);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(mapa);

  var estilo = colorSegunTemperatura(null);
  pinClima = L.marker([UBICACION_INICIAL.lat, UBICACION_INICIAL.lon], { icon: iconoPin(estilo.color) }).addTo(mapa);
  pinClima.bindTooltip(UBICACION_INICIAL.nombre, { permanent: true, direction: "right", offset: [12, -22], className: "mapa-etiqueta" });
  pinClima.bindPopup(estilo.texto);

  // Si el clima llegó antes que el mapa, lo mostramos ahora.
  if (ultimoClimaMostrado) {
    actualizarMapa(ultimoClimaMostrado.lat, ultimoClimaMostrado.lon, ultimoClimaMostrado.ciudad, ultimoClimaMostrado.temperatura);
  }
}

function actualizarMapa(lat, lon, nombre, temperatura) {
  if (!mapa || !pinClima) {
    return;
  }

  var estilo = colorSegunTemperatura(temperatura);
  pinClima.setLatLng([lat, lon]);
  pinClima.setIcon(iconoPin(estilo.color));
  pinClima.setTooltipContent(nombre);
  pinClima.setPopupContent("<strong>" + nombre + "</strong><br>" + estilo.texto);
  mapa.setView([lat, lon], mapa.getZoom());
}
