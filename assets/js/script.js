import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL
cargarHeader();
cargarFooter(); 

// 2. FUNCIÓN PARA DIBUJAR LOS MAPAS
window.initMap = function() {
    
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si no existen los contenedores, no hacemos nada.
    if (!mapaVillarino && !mapaZatti) return;

    // VALIDACIÓN EXTRA: Si Google no cargó bien, no intentamos dibujar para evitar errores
    if (!window.google || !window.google.maps) return;

    console.log("Renderizando mapas...");

    const LOCATIONS = [
        {
            element: mapaVillarino,
            coords: { lat: -40.80377, lng: -62.99217 }, 
            title: 'Consultorio Villarino (Costanera)'
        },
        {
            element: mapaZatti,
            coords: { lat: -40.81562, lng: -62.99279 }, 
            title: 'Consultorio Zatti (Microcentro)'
        }
    ];

    LOCATIONS.forEach(location => {
        if (location.element) {
            // Limpiamos por seguridad
            location.element.innerHTML = '';
            
            const map = new google.maps.Map(location.element, {
                zoom: 15, 
                center: location.coords,
                disableDefaultUI: true, 
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false
            });

            new google.maps.Marker({
                position: location.coords,
                map: map,
                title: location.title
            });
        }
    });
};

// 3. CARGADOR INTELIGENTE
function cargarGoogleMaps() {
    // A. Verificamos si la página actual necesita mapas
    const hayMapas = document.getElementById('mapa-villarino');
    if (!hayMapas) return; 

    // B. ¿La API ya está lista y funcional?
    if (window.google && window.google.maps) {
        window.initMap();
        return;
    }

    // C. CORRECCIÓN CLAVE: MANEJO DE SCRIPT ZOMBI
    // Verificamos si la etiqueta del script ya existe
    const scriptExistente = document.getElementById('gmaps-script');
    
    if (scriptExistente) {
        // Si la etiqueta existe, PERO llegamos a este punto, significa que 
        // window.google NO existe (falló la carga o se perdió por navegación).
        // ENTONCES: Borramos la etiqueta vieja para forzar una recarga limpia.
        console.log("Detectado script zombi. Eliminando y recargando...");
        scriptExistente.remove();
    }

    // D. INYECCIÓN DEL SCRIPT
    console.log("Cargando API de Google Maps...");
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'gmaps-script';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// 4. EJECUCIONES

// Ejecutar al cargar la página
cargarGoogleMaps();

// Ejecutar al volver usando "Atrás" o navegación por historial
window.addEventListener('pageshow', (event) => {
    // Si hay mapas en la pantalla...
    if (document.getElementById('mapa-villarino')) {
        // Intentamos cargar de nuevo. Nuestra nueva lógica detectará si hay 
        // un script viejo que no funciona y lo reemplazará.
        cargarGoogleMaps();
    }
});