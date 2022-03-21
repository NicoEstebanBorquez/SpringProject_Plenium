package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Propiedad;

import java.util.List;

public interface PropiedadDao {

    void guardarNuevaPropiedad(Propiedad propiedad);
    Propiedad obtenerPropiedad(int id);
    List<Propiedad> obtenerListaPropiedades();
    void eliminarPropiedad(int id);
}
