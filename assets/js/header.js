// /assets/js/header.js

function resaltarEnlaceActivo() {
    // 1. Obtener la ruta de la página actual (ej. /pages/acercademi.html)
    // Se usa 'pathname' que retorna la parte de la URL sin el dominio ni parámetros.
    let rutaActual = window.location.pathname;

    // Si estás en la raíz (index.html), window.location.pathname puede ser solo '/',
    // lo ajustamos para que coincida con el href:
    if (rutaActual === '/') {
        rutaActual = '/index.html';
    }
    // Para cualquier página en /pages/ (ej. /pages/acercademi.html) se buscará la coincidencia.
    
    // 2. Iterar sobre todos los enlaces de navegación
    const enlaces = document.querySelectorAll('.navbar-nav .nav-link');
    
    enlaces.forEach(enlace => {
        // Obtenemos el atributo href de cada enlace y lo normalizamos
        const hrefEnlace = enlace.getAttribute('href').toLowerCase();
        
        // 3. Comparar la ruta actual con el href del enlace
        if (rutaActual.includes(hrefEnlace)) {
            // Eliminar cualquier 'active' previo (aunque el forEach es suficiente si no hay errores)
            // enlace.classList.remove('active');
            
            // 4. Agregar la clase 'active' al enlace correspondiente
            enlace.classList.add('active');
            // Opcional: Agregar la clase 'active' también al <li> padre (si lo necesita Bootstrap o CSS)
            enlace.closest('.nav-item').classList.add('active'); 
        } else {
             // Opcional: Asegurarse de quitar 'active' de otros enlaces
            enlace.classList.remove('active');
            enlace.closest('.nav-item').classList.remove('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const headerPath = '/includes/header.html'; 
    const headerContainer = document.getElementById('header-container');

    if (!headerContainer) {
        console.warn('El contenedor del encabezado (<div id="header-container"></div>) no fue encontrado.');
        return; 
    }

    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo cargar el archivo ${headerPath}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            // Inserta el HTML en el contenedor
            headerContainer.innerHTML = htmlContent;
            
            // ¡IMPORTANTE! Llamar a la función después de que el HTML ha sido insertado
            resaltarEnlaceActivo(); 
        })
        .catch(error => {
            console.error('⚠️ Error en la carga del Header:', error.message);
        });
});