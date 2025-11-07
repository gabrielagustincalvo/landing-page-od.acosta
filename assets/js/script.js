// script.js - Lógica específica de la inicialización de Google Maps

// ----------------------------------------------------------------------
// 1. CONFIGURACIÓN DE UBICACIONES
// ----------------------------------------------------------------------

const LOCATIONS = [
    {
        id: 'mapa-villarino',
        // Coordenadas de Villarino
        coords: { lat: -40.80377, lng: -62.99217 }, 
        title: 'Consultorio Villarino'
    },
    {
        id: 'mapa-zatti',
        // Coordenadas de Zatti
        coords: { lat: -40.81562, lng: -62.99279 }, 
        title: 'Consultorio Zatti'
    }
];

// ----------------------------------------------------------------------
// 2. FUNCIÓN DE INICIALIZACIÓN DE MAPAS
// ----------------------------------------------------------------------

/**
 * Inicializa y renderiza los mapas de Google en los elementos del DOM.
 * Esta función debe ser llamada por el script de la API de Google Maps 
 * (ej: mediante callback=initMap en la URL del script).
 */
function initMap() {
    console.log("Inicializando Google Maps para consultorios...");

    LOCATIONS.forEach(location => {
        const mapElement = document.getElementById(location.id);
        
        // Verificación esencial para asegurar que el elemento exista y la API esté cargada.
        if (mapElement && typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            
            const mapOptions = {
                zoom: 15,
                center: location.coords,
                // Opcional: Desactiva los controles de UI no esenciales para un diseño más limpio
                disableDefaultUI: false 
            };

            // Crear el mapa
            const map = new google.maps.Map(mapElement, mapOptions);

            // Agregar el marcador
            new google.maps.Marker({
                position: location.coords,
                map: map,
                title: location.title
            });

        } else if (!mapElement) {
            // Nota de depuración: útil si se ejecuta en páginas sin la sección de mapas
            console.warn(`Elemento mapa con ID ${location.id} no encontrado en el DOM. Saltando inicialización.`);
        }
        // Nota: Si google.maps no existe, el console.log inicial ya fallará o la API no se cargó.
    });
}

// ----------------------------------------------------------------------
// 3. EXPOSICIÓN GLOBAL (REQUERIDO POR LA API DE GOOGLE MAPS)
// ----------------------------------------------------------------------

// ⚠️ IMPORTANTE: Hacer la función global (parte del objeto window) 
// para que el script de la API de Google la pueda invocar automáticamente.
window.initMap = initMap;