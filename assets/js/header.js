// /assets/js/header.js

document.addEventListener('DOMContentLoaded', () => {
    // Definimos la ruta de manera concisa.
    const headerPath = '/includes/header.html'; // Asegúrate de que esta ruta sea correcta
    const headerContainer = document.getElementById('header-container');

    if (!headerContainer) {
        console.warn('El contenedor del encabezado (<div id="header-container"></div>) no fue encontrado.');
        return; // Salir si el contenedor no existe
    }

    // Usar fetch para obtener el contenido
    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                // Lanza un error más específico si el archivo no se encuentra (404)
                throw new Error(`Error ${response.status}: No se pudo cargar el archivo ${headerPath}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            // Inserta el HTML en el contenedor
            headerContainer.innerHTML = htmlContent;
            // Opcional: Agregar console.log para verificar
            // console.log('Header cargado exitosamente.'); 
        })
        .catch(error => {
            console.error('⚠️ Error en la carga del Header:', error.message);
            // Opcional: Insertar un mensaje de fallback en la página
            // headerContainer.innerHTML = '<h1>Error al cargar el menú de navegación.</h1>';
        });
});

