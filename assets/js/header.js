

/* function resaltarEnlaceActivo() {
    // 1. Obtener la ruta de la página actual (ej. /pages/acercademi.html)
    let rutaActual = window.location.pathname;

    // Ajustar para que la raíz coincida con /index.html
    if (rutaActual === '/') {
        rutaActual = '/index.html';
    }
    
    // 2. Iterar sobre todos los enlaces de navegación
    // NOTA: Esta función DEBE llamarse después de que el header.html ha sido insertado
    const enlaces = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (enlaces.length === 0) {
        console.warn('No se encontraron enlaces de navegación con las clases .navbar-nav .nav-link. Asegúrate de que header.html contiene el navbar de Bootstrap.');
        return;
    }

    enlaces.forEach(enlace => {
        const hrefEnlace = enlace.getAttribute('href').toLowerCase();
        
        // 3. Comparar la ruta actual con el href del enlace
        // Usamos includes() para manejar casos como /tratamientos/odontologiaconservadora.html
        if (rutaActual.includes(hrefEnlace)) {
            // 4. Agregar la clase 'active' al enlace correspondiente
            enlace.classList.add('active');
            
            // Si usas Bootstrap, a veces necesitas la clase 'active' en el <li> padre
            const navItem = enlace.closest('.nav-item');
            if (navItem) {
                navItem.classList.add('active'); 
            }
        } else {
            // Asegurarse de quitar 'active' de otros enlaces
            enlace.classList.remove('active');
            const navItem = enlace.closest('.nav-item');
            if (navItem) {
                navItem.classList.remove('active');
            }
        }
    });
}

// -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // **ESTA RUTA DEBE SER ABSOLUTA A LA RAÍZ DEL PROYECTO**
    // Según tu estructura: LANDING PAGE OD ACOSTA/includes/header.html
    const headerPath = '/includes/header.html'; 
    
    const headerContainer = document.getElementById('header-container');

    if (!headerContainer) {
        // Esta advertencia es útil si olvidas el div en algún HTML
        console.error('⚠️ El contenedor del encabezado (<div id="header-container"></div>) no fue encontrado. El Header no se cargará.');
        return; 
    }

    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                // Capturamos el error 404 aquí
                throw new Error(`Error ${response.status}: No se pudo cargar el archivo ${headerPath}. **Asegúrate de que el archivo existe en la carpeta /includes/** y que estás usando un servidor web.`);
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
            // Muestra el error de fetch, típicamente por 404 o por no usar servidor web (CORS)
            console.error('❌ Error en la carga del Header (FETCH falló):', error.message);
        });
});

*/

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