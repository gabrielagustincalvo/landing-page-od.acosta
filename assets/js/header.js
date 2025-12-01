export function cargarHeader(){
    
    document.addEventListener('DOMContentLoaded', ()=> {
        // Necesito la ruta del archivo que quiero tomar
        const headerContainer = document.getElementById('header-container');
        // Aca toma el div o la etiqueta que tenga este id

        // Validamos que este leyendo el contenedor
        if (!headerContainer) {
            console.error("No se encuentra el contenedor #header-container")
            return;
        };

        fetch('/includes/header.html') // Traigo el archivo este
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo cargar el archivo header`)
                // Error el archivo se ha roto: No se pudo cargar el archivo
            }
            return response.text();
        })

        .then(htmlContent => {
            headerContainer.innerHTML = htmlContent

            // 1. Dónde estoy parado ahora (Ej: /tratamientos/bruxismo.html)
            const currentPath = window.location.pathname;
                
            // 2. Buscamos SOLO los enlaces principales del menú (nav-link)
            const navLinks = headerContainer.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');

                if (!linkHref) return; // Si el link está vacío, ignorar.

                // CASO A: Coincidencia Exacta
                // Sirve para Inicio, Acerca de mí, Contacto.
                // Ej: currentPath es "/pages/contacto.html" y el link es "/pages/contacto.html"
                if (currentPath === linkHref) {
                    link.classList.add('active');
                }
                    
                // CASO B: Página de Inicio (Raíz)
                // Si estás en midominio.com/ y el link es index.html
                else if (currentPath === '/' && linkHref.includes('index.html')) {
                    link.classList.add('active');
                }

                // CASO C: Sección TRATAMIENTOS
                // Si la URL actual tiene la palabra "tratamientos" (ej: /tratamientos/bruxismo.html)
                // Y el botón del menú también lleva a "tratamientos"
                else if (currentPath.includes('tratamientos') && linkHref.includes('tratamientos')) {
                    link.classList.add('active');
                }
            });
        })
        .catch(err => console.error('Error cargando el header', err));
    })
}