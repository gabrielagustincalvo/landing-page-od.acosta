// script.js - Lógica específica de la inicialización de Google Maps

(function() { // IIFE para encapsular variables y funciones

    // ----------------------------------------------------------------------
    // 1. CONFIGURACIÓN DE UBICACIONES
    // ----------------------------------------------------------------------

    // Uso de const en mayúsculas para indicar una constante de configuración
    const LOCATIONS = [
        {
            id: 'mapa-villarino',
            // Coordenadas de Villarino
            coords: { lat: -40.80377, lng: -62.99217 }, 
            title: 'Consultorio Villarino (Costanera)'
        },
        {
            id: 'mapa-zatti',
            // Coordenadas de Zatti
            coords: { lat: -40.81562, lng: -62.99279 }, 
            title: 'Consultorio Zatti (Microcentro)'
        }
    ];

    // ----------------------------------------------------------------------
    // 2. FUNCIÓN DE INICIALIZACIÓN DE MAPAS
    // ----------------------------------------------------------------------

    /**
     * Inicializa y renderiza los mapas de Google en los elementos del DOM.
     * Esta función es llamada automáticamente por el script de la API de Google Maps.
     */
    function initMap() {
        console.log("Inicializando Google Maps para consultorios...");

        // Usamos forEach para inicializar cada mapa
        LOCATIONS.forEach(location => {
            const mapElement = document.getElementById(location.id);
            
            // Verificación robusta
            if (mapElement && typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
                
                const mapOptions = {
                    zoom: 15, // Nivel de zoom adecuado para una ubicación local
                    center: location.coords,
                    // Buena práctica: desactivar la UI por defecto para un control completo
                    disableDefaultUI: true, 
                    // Opcional: Agregar controles básicos que sí son útiles
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false
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
                console.warn(`Elemento mapa con ID ${location.id} no encontrado en el DOM. Saltando inicialización.`);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. EXPOSICIÓN GLOBAL (REQUERIDO POR LA API DE GOOGLE MAPS)
    // ----------------------------------------------------------------------

    // Hacer la función initMap global para que la API de Google la pueda invocar.
    window.initMap = initMap;

})(); // La función se invoca inmediatamente