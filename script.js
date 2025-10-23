// script.js

/**
 * Carga un archivo HTML (componente) y lo inyecta en un elemento placeholder.
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
        } else {
             throw new Error(`Placeholder con ID "${targetElementId}" no encontrado.`);
        }

        // Si el componente cargado es el header, inicializa su lógica específica.
        if (url === 'header.html') {
            // Llama a la función definida en header.js
            if (typeof initHeaderInteractivity === 'function') {
                initHeaderInteractivity();
            }
        }
    } catch (error) {
        console.error('Fallo en la carga o inicialización del componente:', error);
    }
}

// Iniciar la carga de componentes cuando el DOM esté completamente listo
document.addEventListener('DOMContentLoaded', () => {
    // Carga el header en el placeholder <div id="header-container">
    loadComponent('header.html', 'header-container');

    // Aquí puedes cargar otros componentes, como el footer
    // loadComponent('footer.html', 'footer-container'); 

    // Aquí va cualquier otra lógica que afecte a la página principal
});