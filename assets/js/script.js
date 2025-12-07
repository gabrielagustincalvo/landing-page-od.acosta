import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL
cargarHeader();
cargarFooter(); 

// 2. DEFINIR LA FUNCIÓN INITMAP
// Esta función debe existir ANTES de llamar a Google
window.initMap = function() {
    
    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si por alguna razón se ejecutó y no están los mapas, salimos.
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

// 3. CARGA DINÁMICA DE GOOGLE MAPS
// Esta función crea la etiqueta <script> programáticamente
function cargarGoogleMaps() {
    // Verificamos si ya hay mapas en la página. Si no hay, no descargamos nada (ahorramos recursos).
    const hayMapas = document.getElementById('mapa-villarino') || document.getElementById('mapa-zatti');
    
    if (!hayMapas) {
        // console.log("No hay mapas en esta página, no se carga la API.");
        return;
    }

    // Evitamos cargar el script dos veces si el usuario navega rápido
    if (document.getElementById('google-maps-script')) {
        // Si el script ya existe, quizás ya cargó, intentamos lanzar initMap manual
        if(window.google && window.google.maps) window.initMap();
        return;
    }

    // Creamos la etiqueta script
    const script = document.createElement('script');
    // IMPORTANTE: Aquí va tu API Key. Nota que mantenemos el callback=initMap
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;

    // Lo agregamos al HTML
    document.body.appendChild(script);
    console.log("Solicitando API de Google Maps...");
}

// Ejecutamos la carga
cargarGoogleMaps();