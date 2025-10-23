// script.js

// ... (La función loadComponent permanece igual a la respuesta anterior,
//      pero aquí tienes el punto clave de su llamada) ...

// Función loadComponent (asumimos que ya está definida para reutilizarla)
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
        // Lógica de inicialización:
        if (url === 'header.html' && typeof initHeaderInteractivity === 'function') {
            initHeaderInteractivity();
        }
    } catch (error) {
        console.error('Fallo en la carga o inicialización del componente:', error);
    }
}


// Iniciar la carga de componentes cuando el DOM esté completamente listo
document.addEventListener('DOMContentLoaded', () => {
    // Carga el Header (e inicia su lógica, gracias a la comprobación dentro de loadComponent)
    loadComponent('header.html', 'header-container');

    // **NUEVA LÍNEA:** Carga el Footer
    loadComponent('footer.html', 'footer-container'); 

    // Aquí va cualquier otra lógica que afecte a la página principal
});