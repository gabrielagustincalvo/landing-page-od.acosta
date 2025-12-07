import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL
cargarHeader();
cargarFooter(); 

// 2. FUNCIÓN PARA DIBUJAR LOS MAPAS
// La definimos primero para que esté lista cuando Google la llame.
window.initMap = function() {
    
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si no existen los contenedores, no hacemos nada.
    if (!mapaVillarino && !mapaZatti) return;

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

// 3. CARGADOR INTELIGENTE (LA SOLUCIÓN)
function cargarGoogleMaps() {
    // A. Verificamos si la página actual necesita mapas
    const hayMapas = document.getElementById('mapa-villarino');
    if (!hayMapas) return; // Si estamos en "Tratamientos", no cargamos nada.

    // B. Verificamos si la API ya está cargada en el navegador (por navegación previa)
    if (window.google && window.google.maps) {
        // Si ya existe, ejecutamos el dibujo directamente
        window.initMap();
        return;
    }

    // C. Verificamos si ya pedimos el script pero aún no llega
    if (document.getElementById('gmaps-script')) return;

    // D. INYECCIÓN DEL SCRIPT (Solo ocurre si initMap ya está definido arriba)
    console.log("Cargando API de Google Maps dinámicamente...");
    const script = document.createElement('script');
    // Callback apunta a nuestra función window.initMap
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'gmaps-script';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// 4. EJECUCIONES
// Ejecutar al cargar el script
cargarGoogleMaps();

// Ejecutar si el usuario vuelve a la página usando "Atrás"
window.addEventListener('pageshow', (event) => {
    // Solo si estamos en una página con mapas
    if (document.getElementById('mapa-villarino')) {
        // Si Google ya está, redibujamos
        if (window.google && window.google.maps) {
            window.initMap();
        } else {
            // Si no, intentamos cargar de nuevo
            cargarGoogleMaps();
        }
    }
});