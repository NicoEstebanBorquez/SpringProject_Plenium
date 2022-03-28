cargarListaInmuebles();

function irNuevoInmueble(){
    window.location.href = 'nuevo_inmueble.html';
}

function irEditarInmueble(id){
    //Almacena en localStorage el ID de la inmueble a editar
    localStorage.setItem("idInmuebleEditar", id);

    //Redirección:
    window.location.href = 'editar_inmueble.html';
}

async function guardarNuevoInmueble(){
    let inmueble = {};
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

      alert("Inmueble guardada correctamente.");
      window.location.href = 'cartera_inmuebles.html';
}


async function cargarListaInmuebles(){
    const request = await fetch('api/inmuebles', {
        method: 'GET',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
        }
    });

    const listaInmuebles = await request.json();

    let listaHTML = '';

  for(let inmueble of listaInmuebles){
    let botonEditar = '<a href="#" onclick="irEditarInmueble('+inmueble.id+')" class="btn btn-primary btn-icon-split btn-sm"><span class="icon text-white-50"> <i class="fas fa-edit"> </i></span><span class="text">Editar</span></a>';
    let botonEliminar = '<a href="#" onclick="eliminarInmueble('+inmueble.id+')" class="btn btn-danger btn-icon-split btn-sm"> <span class="icon text-white-50"> <i class="fas fa-trash"></i> </span> <span class="text">Eliminar</span></a>';

    let inmuebleHTML = '<tr>'+
                        '<td>'+inmueble.id+'</td>' +
                        '<td>'+inmueble.denominacion+'</td>' +
                        '<td>'+inmueble.poblacion+'</td>' +
                        '<td>'+inmueble.provincia+'</td>' +
                        '<td>'+botonEditar+' '+botonEliminar+'</td>' +
                       '</tr>';
    listaHTML += inmuebleHTML;
  }
  document.querySelector('#tabla-cartera-inmuebles tbody').outerHTML = listaHTML;
}


async function eliminarInmueble(id){
    if(confirm('¿Desea eliminar esta inmueble?')){
        const request = await fetch('api/inmuebles/' + id, {
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