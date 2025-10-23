// script.js

// ----------------------------------------------------------------------
// 1. LÓGICA ESPECÍFICA: GOOGLE MAPS (Se ejecuta mediante el callback de la API)
// ----------------------------------------------------------------------

const LOCATIONS = [
    {
        id: 'mapa-villarino',
        coords: { lat: -40.81432, lng: -62.99268 }, // Coordenadas de Villarino
        title: 'Consultorio Villarino'
    },
    {
        id: 'mapa-zatti',
        coords: { lat: -40.80911, lng: -63.00345 }, // Coordenadas de Zatti
        title: 'Consultorio Zatti'
    }
];

/**
 * Inicializa y renderiza los mapas de Google. 
 * Esta función es llamada automáticamente por el script de la API (callback=initMap).
 */
function initMap() {
    console.log("Inicializando Google Maps...");
    
    LOCATIONS.forEach(location => {
        const mapElement = document.getElementById(location.id);
        
        if (mapElement && typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            const mapOptions = {
                zoom: 15,
                center: location.coords
            };

            // Crear el mapa y dibujarlo
            const map = new google.maps.Map(mapElement, mapOptions);

            // Agregar el marcador
            new google.maps.Marker({
                position: location.coords,
                map: map,
                title: location.title
            });
        } else if (!mapElement) {
             // Si el elemento no existe, es probable que no estemos en el index.html
             console.log(`Elemento mapa con ID ${location.id} no encontrado en el DOM.`);
        }
    });
}

// ⚠️ IMPORTANTE: Hacer la función global para que la API la pueda llamar.
window.initMap = initMap; 


// ----------------------------------------------------------------------
// 2. LÓGICA DE UTILIDAD: Carga de Componentes HTML (Reutilizada)
// ----------------------------------------------------------------------

/**
 * Carga un archivo HTML (componente) y lo inyecta en un elemento placeholder.
 * @param {string} url - La ruta del archivo HTML (ej: 'header.html').
 * @param {string} targetElementId - El ID del contenedor en el index.html (ej: 'header-container').
 */
async function loadComponent(url, targetElementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
            targetElement.innerHTML = html;
        } 
        
        // 🚨 Lógica condicional de inicialización para el Header
        // Llama a la lógica específica del header (definida en header.js) solo si se cargó.
        if (url === 'header.html' && typeof initHeaderInteractivity === 'function') {
            initHeaderInteractivity();
        }
        
    } catch (error) {
        console.error(`Fallo en la carga del componente ${url}:`, error);
    }
}


// ----------------------------------------------------------------------
// 3. ORQUESTACIÓN: Inicio de la Aplicación (Carga de Componentes)
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Carga el Header (e inicia su lógica interactiva)
    loadComponent('/header.html', 'header-container');

    // Carga el Footer (no tiene lógica interactiva propia)
    loadComponent('/footer.html', 'footer-container'); 

    // Aquí podría ir otra lógica de inicialización para el MAIN
});