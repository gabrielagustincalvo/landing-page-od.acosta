import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL
cargarHeader();
cargarFooter(); 


// 2. FUNCIÓN DE RENDERIZADO (Dibuja los mapas)
window.renderizarMapas = function() {
    
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si no existen los contenedores (ej: estás en tratamientos.html), salimos.
    if (!mapaVillarino && !mapaZatti) return;

    // Verificar que Google Maps realmente existe antes de usarlo
    if (!window.google || !window.google.maps) {
        // Si no está listo, esperamos un poco y reintentamos
        setTimeout(window.renderizarMapas, 100);
        return;
    }

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
            // PASO CLAVE: Limpiamos el contenedor antes de crear un mapa nuevo.
            // Esto evita que se superpongan mapas si la función se ejecuta dos veces.
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
}

// Vinculamos initMap a nuestra función para cuando el script de Google lo llame
window.initMap = window.renderizarMapas;


// 3. LOGICA DE CARGA (Loader)
function cargarGoogleMaps() {
    
    // A. ¿Hay mapas en esta página?
    const hayContenedores = document.getElementById('mapa-villarino');
    if (!hayContenedores) return; 

    // B. ¿Google Maps YA está en memoria? 
    // (Esto pasa si vuelves del historial o navegas desde otra sección)
    if (window.google && window.google.maps) {
        // Aunque esté en memoria, FORZAMOS el redibujado
        console.log("Google en memoria. Forzando renderizado...");
        window.renderizarMapas();
        return;
    }

    // C. Evitar doble inyección de script
    if (document.getElementById('google-maps-script')) {
        return; 
    }

    // D. Inyectar el script
    console.log("Cargando API...");
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// 4. EJECUCIONES

// Ejecutar al cargar la página normalmente
cargarGoogleMaps();

// EVENTO PAGESHOW: La solución definitiva al botón "Atrás" y navegación interna.
// Este evento se dispara siempre que la página se vuelve visible.
window.addEventListener('pageshow', (event) => {
    // Verificamos si hay mapas en la pantalla actual
    const hayMapas = document.getElementById('mapa-villarino');
    if (hayMapas) {
        console.log("Evento pageshow detectado. Revisando mapas...");
        // Si Google ya existe, redibujamos sin miedo.
        if (window.google && window.google.maps) {
            window.renderizarMapas();
        } else {
            // Si no existe, intentamos cargar de nuevo
            cargarGoogleMaps();
        }
    }
});