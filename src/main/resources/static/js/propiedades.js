cargarListaPropiedades();

function irNuevaPropiedad(){
    window.location.href = 'nueva_propiedad.html';
}

function irEditarPropiedad(id){
    //Almacena en localStorage el ID de la propiedad a editar
    localStorage.setItem("idPropiedadEditar", id);

    //Redirección:
    window.location.href = 'editar_propiedad.html';
}

async function guardarNuevaPropiedad(){
    let propiedad = {};
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

      alert("Propiedad guardada correctamente.");
      window.location.href = 'cartera_propiedades.html';
}


async function cargarListaPropiedades(){
    const request = await fetch('api/propiedades', {
        method: 'GET',
        headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
    });

    const listaPropiedades = await request.json();

    let listaHTML = '';

  for(let propiedad of listaPropiedades){
    let botonEditar = '<a href="#" onclick="irEditarPropiedad('+propiedad.id+')" class="btn btn-primary btn-icon-split btn-sm"><span class="icon text-white-50"> <i class="fas fa-edit"> </i></span><span class="text">Editar</span></a>';
    let botonEliminar = '<a href="#" onclick="eliminarPropiedad('+propiedad.id+')" class="btn btn-danger btn-icon-split btn-sm"> <span class="icon text-white-50"> <i class="fas fa-trash"></i> </span> <span class="text">Eliminar</span></a>';

    let propiedadHTML = '<tr>'+
                        '<td>'+propiedad.id+'</td>' +
                        '<td>'+propiedad.denominacion+'</td>' +
                        '<td>'+propiedad.poblacion+'</td>' +
                        '<td>'+propiedad.provincia+'</td>' +
                        '<td>'+botonEditar+' '+botonEliminar+'</td>' +
                       '</tr>';
    listaHTML += propiedadHTML;
  }
  document.querySelector('#tabla-cartera-propiedades tbody').outerHTML = listaHTML;
}


async function eliminarPropiedad(id){
    if(confirm('¿Desea eliminar esta propiedad?')){
        const request = await fetch('api/propiedades/' + id, {
                    method: 'DELETE',
                    headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                    }
                });
                //Recargar página
                location.reload();
    }
}