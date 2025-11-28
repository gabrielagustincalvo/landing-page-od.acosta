import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// ==========================================
// 1. EJECUCIÓN GLOBAL (Header y Footer)
// ==========================================
// Esto se ejecutará en TODAS las páginas que importen este script.
cargarHeader();
cargarFooter(); 


// ==========================================
// 2. LÓGICA DE GOOGLE MAPS (Condicional)
// ==========================================

// Definimos la función initMap y la asignamos a window para que la API de Google la encuentre.
window.initMap = function() {
    
    // A. DETECCIÓN DE ELEMENTOS DOM
    // Buscamos los contenedores en el HTML actual.
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // B. CONDICIONAL DE SALIDA
    // Si NO existe ninguno de los dos mapas en esta página (ej: estamos en tratamientos.html),
    // detenemos la función aquí. Así evitamos errores y lógica innecesaria.
    if (!mapaVillarino && !mapaZatti) {
        // Opcional: console.log("No hay mapas en esta página, omitiendo lógica de Google Maps.");
        return; 
    }

    console.log("Contenedores de mapa detectados. Renderizando mapas...");

    // C. CONFIGURACIÓN DE UBICACIONES
    // Solo definimos esto si sabemos que vamos a usarlo.
    const LOCATIONS = [
        {
            element: mapaVillarino, // Pasamos el elemento HTML directo
            coords: { lat: -40.80377, lng: -62.99217 }, 
            title: 'Consultorio Villarino (Costanera)'
        },
        {
            element: mapaZatti,
            coords: { lat: -40.81562, lng: -62.99279 }, 
            title: 'Consultorio Zatti (Microcentro)'
        }
    ];

    // D. RENDERIZADO
    LOCATIONS.forEach(location => {
        // Verificamos que el elemento exista (por si borraste uno del HTML)
        if (location.element) {
            const mapOptions = {
                zoom: 15, 
                center: location.coords,
                disableDefaultUI: true, 
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false
            };

            const map = new google.maps.Map(location.element, mapOptions);

            new google.maps.Marker({
                position: location.coords,
                map: map,
                title: location.title
            });
        }
    });
};

// MANEJO DE CARGA ASÍNCRONA (Race Condition)

// A veces la API de google puede cargar mas rapido que el modulo js, si eso pasa el callback=init.Map falla porque initMap todavia no existia.
// Si detectamos que google.maps ya está listo, lanzamos initMap manualmente.

if (window.google && window.google.maps) {
    window.initMap();
}