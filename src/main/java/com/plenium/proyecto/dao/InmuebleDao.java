package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Inmueble;

import java.util.List;

public interface InmuebleDao {

    void guardarNuevoInmueble(Inmueble inmueble);
    Inmueble obtenerInmueble(int id);
    List<Inmueble> obtenerListaInmuebles();
    void eliminarInmueble(int id);
}
