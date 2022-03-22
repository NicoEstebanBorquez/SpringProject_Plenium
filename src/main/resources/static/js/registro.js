
async function registrarUsuario() {
    let usuario = {};
    usuario.nombre = document.getElementById("txtNombre").value;
    usuario.apellidos = document.getElementById('txtApellidos').value;
    usuario.email = document.getElementById('txtEmail').value;
    usuario.contrasena = document.getElementById('txtContrasena').value;

    let repetirContrasena = document.getElementById('txtRepetirContrasena').value;

    if (repetirContrasena != usuario.contrasena) {
        alert('Las contraseñas no coinciden.');
        return;
    }
        
    const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    //Mensaje de confirmación y redirección a Login.html
    alert("Cuenta creada correctamente.");
    window.location.href = 'login.html';
}