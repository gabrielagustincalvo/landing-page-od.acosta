export function cargarHeader() {
    document.addEventListener('DOMContentLoaded', () => {
        const headerContainer = document.getElementById('header-container');

        if (!headerContainer) {
            console.error("No se encuentra el contenedor #header-container");
            return;
        }

        // 1. DETECTAR UBICACIÓN ACTUAL
        // Si estamos dentro de la carpeta /pages/ o /tratamientos/, necesitamos salir un nivel (../)
        // Si estamos en el index, nos quedamos en el nivel actual (./)
        const path = window.location.pathname;
        let rutaRelativa = './';
        
        if (path.includes('/pages/') || path.includes('/tratamientos/')) {
            rutaRelativa = '../';
        }

        // 2. HACER EL FETCH CON LA RUTA CORREGIDA
        // Quitamos la barra del inicio '/' y usamos la ruta relativa calculada
        fetch(rutaRelativa + 'includes/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo cargar el archivo header`);
                }
                return response.text();
            })
            .then(htmlContent => {
                headerContainer.innerHTML = htmlContent;

                // 3. CORREGIR ENLACES E IMÁGENES DENTRO DEL HEADER
                // Como el HTML del header tiene rutas con '/' (ej: /index.html), 
                // las reemplazamos dinámicamente para que funcionen en GitHub Pages.
                
                const elementosConRuta = headerContainer.querySelectorAll('[src], [href]');
                
                elementosConRuta.forEach(el => {
                    const atributo = el.hasAttribute('src') ? 'src' : 'href';
                    let valor = el.getAttribute(atributo);

                    // Si la ruta empieza con '/', se la quitamos y agregamos la ruta relativa
                    if (valor && valor.startsWith('/')) {
                        // Ejemplo: convierte "/assets/img/foto.jpg" en "../assets/img/foto.jpg"
                        let nuevoValor = rutaRelativa + valor.substring(1);
                        el.setAttribute(atributo, nuevoValor);
                    }
                });

                // 4. LÓGICA DE "ACTIVE" (TU CÓDIGO ORIGINAL ADAPTADO)
                const currentPath = window.location.pathname;
                const navLinks = headerContainer.querySelectorAll('.nav-link');

                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    if (!linkHref) return;

                    // Normalizamos para comparar (quitamos los ./ o ../ para verificar coincidencia)
                    const cleanLink = linkHref.replace(/^(\.\/|\.\.\/)/, '/'); 
                    
                    // Lógica de coincidencia simple
                    if (currentPath.endsWith(cleanLink) || (currentPath === '/' && cleanLink.includes('index.html'))) {
                        link.classList.add('active');
                    } else if (currentPath.includes('tratamientos') && cleanLink.includes('tratamientos')) {
                        link.classList.add('active');
                    }
                });
            })
            .catch(err => console.error('Error cargando el header', err));
    });
}