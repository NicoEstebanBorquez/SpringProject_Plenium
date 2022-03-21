  let id = localStorage.getItem("idPropiedadEditar");
  console.log("propiedad que voy a editar: " + id);
  cargarPropiedadEditar(id);


async function cargarPropiedadEditar(id) {
  const request = await fetch('api/propiedades/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'//,
      //'Authorization': localStorage.token
    }
  });
  const propiedad = await request.json();

   let formulario = '<form class="user">' +
   '<div class="form-group row">' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtId" value="'+propiedad.id+'"></div>' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtDenominacion"placeholder="Denominación" value="'+propiedad.denominacion+'"></div>' +
   '</div>' +
   '<div class="form-group row">' +
   '<div class="col-sm-4"><input type="text" class="form-control form-control-user" id="txtPoblacion" placeholder="Población" value="'+propiedad.poblacion+'"></div>' +
   '<div class="col-sm-4 mb-3 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtProvincia" placeholder="Provincia" value="'+propiedad.provincia+'"></div>' +
   '</div>' +
   '<a onClick="guardarCambios()" href="#" class="btn btn-primary btn-user ">Guardar</a><hr>' +
   '</form>';
  document.querySelector('#formulario').outerHTML = formulario;
}


async function guardarCambios(){
    let propiedad = {};
    propiedad.id = document.getElementById('txtId').value;
    propiedad.denominacion = document.getElementById('txtDenominacion').value;
    propiedad.poblacion = document.getElementById('txtPoblacion').value;
    propiedad.provincia = document.getElementById('txtProvincia').value;

    const request = await fetch('api/propiedades', {
        method: 'POST',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(propiedad)
      });

      alert('Propiedad actualizada correctamente.');
      window.location.href = 'cartera_propiedades.html';
}
