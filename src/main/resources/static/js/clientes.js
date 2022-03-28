cargarListaClientes();

function irNuevoCliente(){
    window.location.href = 'nuevo_cliente.html';
}

function irEditarCliente(id){
    //Almacena en localStorage el ID del cliente a editar
    localStorage.setItem("idClienteEditar", id);

    //Redirección:
    window.location.href = 'editar_cliente.html';
}

async function guardarNuevoCliente(){
    let cliente = {};
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

      alert("Cliente guardado correctamente.");
      window.location.href = 'lista_clientes.html';
}


async function cargarListaClientes(){
    const request = await fetch('api/clientes', {
        method: 'GET',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
        }
    });

    const listaClientes = await request.json();

    let listaHTML = '';

  for(let cliente of listaClientes){
    let botonEditar = '<a href="#" onclick="irEditarCliente('+cliente.id+')" class="btn btn-primary btn-icon-split btn-sm"><span class="icon text-white-50"> <i class="fas fa-edit"> </i></span><span class="text">Editar</span></a>';
    let botonEliminar = '<a href="#" onclick="eliminarCliente('+cliente.id+')" class="btn btn-danger btn-icon-split btn-sm"> <span class="icon text-white-50"> <i class="fas fa-trash"></i> </span> <span class="text">Eliminar</span></a>';

    let clienteHTML = '<tr>'+
                        '<td>'+cliente.id+'</td>' +
                        '<td>'+cliente.nombre+' '+cliente.primerApellido+' '+cliente.segundoApellido+'</td>' +
                        '<td>'+cliente.telefono+'</td>' +
                        '<td>'+cliente.email+'</td>' +
                        '<td>'+botonEditar+' '+botonEliminar+'</td>' +
                       '</tr>';
    listaHTML += clienteHTML;
  }
  document.querySelector('#tabla-lista-clientes tbody').outerHTML = listaHTML;
}


async function eliminarCliente(id){
    if(confirm('¿Desea eliminar este cliente?')){
        const request = await fetch('api/clientes/' + id, {
                    method: 'DELETE',
                    headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                    }
                });
                //Recargar página
                location.reload();
    }
}