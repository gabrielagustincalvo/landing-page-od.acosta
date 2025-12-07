import { cargarHeader } from './header.js';
import { cargarFooter } from './footer.js'; 

// 1. EJECUCIÓN GLOBAL
cargarHeader();
cargarFooter(); 


// 2. FUNCIÓN DE RENDERIZADO (Dibuja los mapas)
// La separamos de la carga para poder llamarla cuando queramos.
function renderizarMapas() {
    
    // Evitamos redibujar si ya lo hicimos (Protección contra doble carga)
    if (window.mapasYaDibujados) return;

    const mapaVillarino = document.getElementById('mapa-villarino');
    const mapaZatti = document.getElementById('mapa-zatti');

    // Si no existen los contenedores (estás en otra página), salimos.
    if (!mapaVillarino && !mapaZatti) return;

    // Verificar que Google Maps realmente existe antes de usarlo
    if (!window.google || !window.google.maps) {
        // Si llegamos aquí y no está google, algo raro pasó, reintentamos en 500ms
        setTimeout(renderizarMapas, 500);
        return;
    }

    console.log("Iniciando renderizado de mapas...");

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

    // Marcamos bandera de éxito
    window.mapasYaDibujados = true;
}

// Hacemos la función global por si el callback de Google la busca
window.initMap = renderizarMapas;


// 3. LOGICA DE CARGA DE SCRIPTS (EL CORAZÓN DE LA SOLUCIÓN)
function cargarGoogleMaps() {
    
    // A. ¿Estamos en una página con mapas?
    const hayContenedores = document.getElementById('mapa-villarino') || document.getElementById('mapa-zatti');
    if (!hayContenedores) return; // Si no hay mapas, no descargamos nada.

    // Reiniciamos la bandera de dibujo para esta nueva carga de página
    window.mapasYaDibujados = false;

    // B. ¿Google Maps YA está en memoria? (Caso: Navegación rápida o volver atrás)
    if (window.google && window.google.maps) {
        console.log("Detectado Google Maps en memoria. Ejecutando directo.");
        renderizarMapas();
        return;
    }

    // C. ¿El script ya existe en el HTML pero aún no cargó?
    const scriptExistente = document.getElementById('google-maps-script');
    if (scriptExistente) {
        // Si existe, le forzamos el evento onload por si acaso se perdió
        scriptExistente.onload = renderizarMapas;
        return; 
    }

    // D. Caso Normal: Inyectar el script
    console.log("Cargando script de Google Maps...");
    const script = document.createElement('script');
    
    // Mantenemos el callback=initMap para que Google no se queje, 
    // pero nuestra verdadera seguridad es el script.onload de abajo.
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4wbd68nbbVZ9zrejhdD7SUw2GULQntho&callback=initMap';
    script.id = 'google-maps-script';
    script.async = true;
    script.defer = true;

    // ESTA ES LA CLAVE: Cuando el archivo termine de bajar, ejecutamos nuestra función.
    // Esto funciona independientemente de si el callback de Google falló o no.
    script.onload = () => {
        console.log("Script cargado. Ejecutando renderizarMapas().");
        renderizarMapas();
    };

    document.body.appendChild(script);
}

// 4. EJECUCIONES

// Ejecutar al cargar
cargarGoogleMaps();

// Manejar el botón "Atrás" del navegador (BFCache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log("Restaurando de caché...");
        cargarGoogleMaps();
    }
});