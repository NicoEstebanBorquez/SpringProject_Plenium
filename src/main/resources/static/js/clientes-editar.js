  let id = localStorage.getItem("idClienteEditar");
  cargarClienteEditar(id);


async function cargarClienteEditar(id) {
  const request = await fetch('api/clientes/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.token
    }
  });
  const cliente = await request.json();

   let formulario = '<form class="user">' +
   '<div class="form-group row">' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtId" value="'+cliente.id+'"></div>' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtNombre" placeholder="Nombre" value="'+cliente.nombre+'"></div>' +
   '</div>' +
   '<div class="form-group row">' +
   '<div class="col-sm-4"><input type="text" class="form-control form-control-user" id="txtPrimerApellido" placeholder="Primer apellido" value="'+cliente.primerApellido+'"></div>' +
   '<div class="col-sm-4 mb-3 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtSegundoApellido" placeholder="Segundo apellido" value="'+cliente.segundoApellido+'"></div>' +
   '</div>' +
   '<div class="form-group row">' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtDocumentoIdentidad" value="'+cliente.documentoIdentidad+'"></div>' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtTelefono" value="'+cliente.telefono+'"></div>' +
   '</div>' +
   '<div class="form-group row">' +
   '<div class="col-sm-4 mb-2 mb-sm-0"><input type="text" class="form-control form-control-user" id="txtEmail" value="'+cliente.email+'"></div>' +
   '</div>' +
   '<a onClick="guardarCambios()" href="#" class="btn btn-primary btn-user ">Guardar</a><hr>' +
   '</form>';
  document.querySelector('#formulario').outerHTML = formulario;
}


async function guardarCambios(){
    let cliente = {};
    cliente.id = document.getElementById('txtId').value;
    cliente.documentoIdentidad = document.getElementById('txtDocumentoIdentidad').value;
    cliente.nombre = document.getElementById('txtNombre').value;
    cliente.primerApellido = document.getElementById('txtPrimerApellido').value;
    cliente.segundoApellido = document.getElementById('txtSegundoApellido').value;
    cliente.telefono = document.getElementById('txtTelefono').value;
    cliente.email = document.getElementById('txtEmail').value;

    const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
        },
        body: JSON.stringify(cliente)
      });

      alert('Cliente actualizado correctamente.');
      window.location.href = 'lista_clientes.html';
}
