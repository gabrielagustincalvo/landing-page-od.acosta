// header.js

/**
 * Inicializa toda la lógica interactiva del header (menú y buscador).
 * Esta función será llamada desde script.js una vez que el HTML esté cargado.
 */
function initHeaderInteractivity() {
    
    // --- 1. Lógica del Menú Desplegable "Tratamientos" (Hover) ---
    const treatmentsMenuContainer = document.getElementById('menu-tratamientos');
    const treatmentsSubmenu = document.getElementById('submenu-tratamientos');

    if (treatmentsMenuContainer && treatmentsSubmenu) {
        // Mostrar el submenú al pasar el ratón por encima (mouseenter)
        treatmentsMenuContainer.addEventListener('mouseenter', () => {
            treatmentsSubmenu.classList.add('is-open');
        });

        // Ocultar el submenú al salir el ratón (mouseleave)
        treatmentsMenuContainer.addEventListener('mouseleave', () => {
            treatmentsSubmenu.classList.remove('is-open');
        });
        
        // **NOTA IMPORTANTE:** Para un menú desplegable simple, a menudo
        // es mejor usar solo CSS con la pseudoclase `:hover` en el padre (`.menu-desplegable:hover .submenu`).
        // Usamos JS aquí para demostrar la modularidad de header.js.
    }

    // --- 2. Lógica del Buscador ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

            const searchTerm = searchInput.value.trim();

            if (searchTerm.length > 2) {
                // *** Implementación de Búsqueda ***
                // Opción más común para sitios estáticos: redirigir a una página de resultados
                // o usar un motor de búsqueda externo (como Google con 'site:tusitio.com')
                
                const searchURL = `/resultados.html?q=${encodeURIComponent(searchTerm)}`;
                
                // Muestra un mensaje y luego redirige (opcional)
                alert(`Buscando "${searchTerm}"...`);
                // window.location.href = searchURL;

                console.log(`Búsqueda simulada para: ${searchTerm}`);
            } else {
                alert('Por favor, introduce al menos 3 caracteres para buscar.');
            }
        });
    }
}