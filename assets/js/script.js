import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL (Header y Footer)
cargarHeader();
cargarFooter(); 


// 2. DEFINIR LA FUNCIÓN INITMAP
// Esta es la "receta" de cómo dibujar el mapa. La definimos globalmente.
window.initMap = function() {
    
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si no existen los contenedores en este momento, no hacemos nada.
    if (!mapaVillarino && !mapaZatti) return;

    console.log("Dibujando mapas...");

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
            // Creamos el mapa (esto sobrescribe el div si ya había uno viejo)
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


// 3. FUNCIÓN DE CARGA INTELIGENTE
// Esta función decide si descargar el script de Google o usar lo que ya está en memoria.
function gestionarMapas() {
    
    // A. ¿Hay mapas en esta página?
    const hayContenedores = document.getElementById('mapa-villarino') || document.getElementById('mapa-zatti');
    if (!hayContenedores) return; // Si no hay divs, nos vamos.

    // B. ¿Google Maps YA está cargado en el navegador?
    // Esto pasa cuando vas a otra sección y vuelves. La librería sigue viva en memoria.
    if (window.google && window.google.maps) {
        console.log("Google Maps ya estaba en memoria. Redibujando...");
        window.initMap(); // Llamamos a la función manualmente
        return;
    }

    // C. ¿El script ya se insertó pero aún no cargó?
    if (document.getElementById('google-maps-script')) {
        return; // Esperamos a que el callback automático haga su trabajo
    }

    // D. Caso Normal: No está la librería, hay que descargarla.
    console.log("Descargando API de Google Maps...");
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}


// 4. EJECUCIONES (La Solución al Error)

// Ejecutar al cargar la página por primera vez
gestionarMapas();

// Ejecutar cuando el usuario vuelve usando "Atrás" o el historial (Evento pageshow)
window.addEventListener('pageshow', (event) => {
    // Si la página se restauró desde la caché (bfcache), forzamos la carga de nuevo
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        console.log("Página restaurada del historial. Recargando mapas...");
        gestionarMapas();
    }
});