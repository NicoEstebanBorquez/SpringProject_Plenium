
async function iniciarSesion() {

    let credenciales = {};
    credenciales.email = document.getElementById('txtEmail').value;
    credenciales.contrasena = document.getElementById('txtContrasena').value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
      });
      const respuesta = await request.text();

      if(respuesta != "error 401"){
        localStorage.token = respuesta;
        localStorage.email = credenciales.email;
        
        //Redirección:
        window.location.href = 'index.html';
      } else {
        alert("E-mail o contraseña incorrectos.");
      }


}