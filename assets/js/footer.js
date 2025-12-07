export function cargarFooter() {
    document.addEventListener('DOMContentLoaded', () => {
        const footerContainer = document.getElementById('footer-container');

        if (!footerContainer) {
            console.error("No se encuentra el contenedor #footer-container");
            return;
        }

        // 1. CALCULAR RUTA RELATIVA
        // Detectamos si estamos en una subcarpeta (pages o tratamientos) para saber si usar ./ o ../
        const path = window.location.pathname;
        let rutaRelativa = './';
        
        // Si la URL contiene 'pages' o 'tratamientos', hay que salir un nivel atrás
        if (path.includes('/pages/') || path.includes('/tratamientos/')) {
            rutaRelativa = '../';
        }

        // 2. FETCH CON RUTA CORREGIDA
        fetch(rutaRelativa + 'includes/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo cargar el archivo footer`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // Insertamos el HTML en el contenedor
                footerContainer.innerHTML = htmlContent;

                // 3. CORREGIR ENLACES E IMÁGENES DENTRO DEL FOOTER
                // Buscamos todas las etiquetas que tengan src o href (imágenes y enlaces)
                const elementosConRuta = footerContainer.querySelectorAll('[src], [href]');
                
                elementosConRuta.forEach(el => {
                    const atributo = el.hasAttribute('src') ? 'src' : 'href';
                    let valor = el.getAttribute(atributo);

                    // SOLUCIÓN CLAVE:
                    // Si la ruta empieza con '/' (ej: /assets/img/logo.jpg), es una ruta absoluta que fallará en GitHub.
                    // La reemplazamos por la ruta relativa calculada (ej: ../assets/img/logo.jpg).
                    // IMPORTANTE: Esto NO toca los enlaces externos (http://...) como el de AFIP.
                    if (valor && valor.startsWith('/')) {
                        let nuevoValor = rutaRelativa + valor.substring(1);
                        el.setAttribute(atributo, nuevoValor);
                    }
                });
            })
            .catch(err => console.error('Error cargando el footer', err));
    });
}