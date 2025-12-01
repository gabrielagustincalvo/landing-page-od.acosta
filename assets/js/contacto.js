// formulario con Email JS

// Para conectar el email js, necesitamos 3 datos 

const EMAILJS_PUBLIC_KEY = '3pY-wzERV22X0sGvU'; 

const EMAILJS_SERVICE_ID = 'service_25nv9x3'; 

const EMAILJS_TEMPLATE_ID = 'template_jnpf1kn'; 

// {{user_name}} {{user_email}}

// Inicializacion de EMAIL JS 
emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
}); // Inicializa email js con la key 

// selectores 
const form = document.getElementById("contact-form"); //FORMULARIO 
const sendBtn = document.getElementById("envio"); // BOTON DE ENVIAR 

// EVENTO DE ENVIO 
// dos parametros: el evento, y la funcion que ejecuta ese evento 
form.addEventListener("submit", function(e){
 
    // instruccion de lo que debe hacer el envio del formulario 
    e.preventDefault();
    
    const btnContent = sendBtn.innerHTML;

    sendBtn.textContent = 'Enviando...'; 
    sendBtn.disabled = true; 
     
    // ENVIO DESDE EMAIL JS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    // sendForm envia los datos del formulario a tu plantilla de emailjs 
    .then(()=>{
        alert("Mensaje enviado correctamente"); 
        form.reset(); 
        sendBtn.innerHTML = btnContent; 
        sendBtn.disabled = false; 
    })
    .catch((error) => {
        console.error('Emailjs error:', error); 
        alert('Hubo un error al enviar tu mensaje'); 
        sendBtn.innerHTML = btnContent; 
        sendBtn.disabled = false; 
    })

});
