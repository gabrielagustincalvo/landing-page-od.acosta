// footer.js

document.addEventListener("DOMContentLoaded", function() {
    // 1. Define el contenedor donde se insertará el footer
    const footerContainer = document.getElementById('footer-container');

    // 2. Verifica que el contenedor exista
    if (footerContainer) {
        
        // 3. Define el HTML completo del footer
        const footerHTML = `
            <footer class="bg-dark text-white pt-5 pb-4">
                <div class="container text-center text-md-left">
                    <div class="row text-center text-md-left">

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-primary">Odontología Acosta</h5>
                            
                            <img src="/assets/img/logo-horizontal1.jpeg" alt="Logo Odontología Acosta" class="logo-header" style="max-width: 200px;">
                            
                            <p>
                                <i class="fas fa-envelope mr-3"></i> odafacosta@email.com
                            </p>
                            <p>
                                <i class="fab fa-whatsapp mr-3"></i> +54 9 2984 40-1229
                            </p>
                        </div>
                        
                        <hr class="w-100 clearfix d-md-none" />

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-primary">Navegación</h5>
                            <p><a href="/index.html" class="text-white" style="text-decoration: none;">Inicio</a></p>
                            <p><a href="/pages/acercademi.html" class="text-white" style="text-decoration: none;">Acerca de mi</a></p>
                            <p><a href="/pages/tratamientos.html" class="text-white" style="text-decoration: none;">Tratamientos</a></p>
                            <p><a href="/pages/contacto.html" class="text-white" style="text-decoration: none;">Contacto</a></p>

                        </div>
                        
                        <hr class="w-100 clearfix d-md-none" />

                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
                            <h5 class="text-uppercase mb-4 font-weight-bold text-primary">Consultorios</h5>
                            <p>Avenida Villarino 496, Viedma</p>
                            <p>Artémides Zatti 350, Viedma</p>
                            <p><a href="#location" class="text-white" style="text-decoration: none;">Ver en el mapa</a></p>
                        </div>

                    </div>
                    
                    <hr class="my-3" />

                    <div class="row">
                        <div class="col-12">
                            <p class="text-center mb-0">
                                © ${new Date().getFullYear()} Copyright | 
                                <a href="/index.html" class="footer-copyright-link">
                                    <strong>Odontología Acosta</strong>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        
        // 4. Inserta el HTML en el contenedor
        footerContainer.innerHTML = footerHTML;
    } else {
        console.error("Error: El elemento con id 'footer-container' no se encontró en el DOM.");
    }
});

