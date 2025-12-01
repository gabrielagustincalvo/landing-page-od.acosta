export function cargarFooter(){
    
    document.addEventListener('DOMContentLoaded', ()=> {
        // Necesito la ruta del archivo que quiero tomar
        const footerContainer = document.getElementById('footer-container');
        // Aca toma el div o la etiqueta que tenga este id

        // Validamos que este leyendo el contenedor
        if (!footerContainer) {
            console.error("No se encuentra el contenedor #footer-container")
            return;
        };

        fetch('/includes/footer.html') // Traigo el archivo este
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudo cargar el archivo footer`)
                // Error el archivo se ha roto: No se pudo cargar el archivo
            }
            return response.text();
        })

        .then(htmlContent => {
            footerContainer.innerHTML = htmlContent
        })
        .catch(err => console.error('Error cargando el footer', err));
    })
}
