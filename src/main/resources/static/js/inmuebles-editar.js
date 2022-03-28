  let id = localStorage.getItem("idInmuebleEditar");
  cargarInmuebleEditar(id);


async function cargarInmuebleEditar(id) {
  const request = await fetch('api/inmuebles/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  });
  const inmueble = await request.json();

   let formulario = '<form class="user">' +
   '<div class="form-group row">' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtId" value="'+inmueble.id+'"></div>' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtDenominacion"placeholder="Denominación" value="'+inmueble.denominacion+'"></div>' +
   '</div>' +
   '<div class="form-group row">' +
   '<div class="col-sm-4"><input type="text" class="form-control form-control-user" id="txtPoblacion" placeholder="Población" value="'+inmueble.poblacion+'"></div>' +
   '<div class="col-sm-4 mb-3 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtProvincia" placeholder="Provincia" value="'+inmueble.provincia+'"></div>' +
   '</div>' +
   '<a onClick="guardarCambios()" href="#" class="btn btn-primary btn-user ">Guardar</a><hr>' +
   '</form>';
  document.querySelector('#formulario').outerHTML = formulario;
}


async function guardarCambios(){
    let inmueble = {};
    inmueble.id = document.getElementById('txtId').value;
    inmueble.denominacion = document.getElementById('txtDenominacion').value;
    inmueble.poblacion = document.getElementById('txtPoblacion').value;
    inmueble.provincia = document.getElementById('txtProvincia').value;

    const request = await fetch('api/inmuebles', {
        method: 'POST',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
        },
        body: JSON.stringify(inmueble)
      });

      alert('Inmueble actualizada correctamente.');
      window.location.href = 'cartera_inmuebles.html';
}
