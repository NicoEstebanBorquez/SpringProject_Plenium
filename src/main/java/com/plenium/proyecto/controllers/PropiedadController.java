package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.PropiedadDao;
import com.plenium.proyecto.model.Propiedad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PropiedadController {

    @Autowired
    PropiedadDao propiedadDao;

    @RequestMapping(value = "api/propiedades", method = RequestMethod.POST)
    public void guardarNuevaPropiedad(@RequestBody Propiedad propiedad) {
        propiedadDao.guardarNuevaPropiedad(propiedad);
    }

    @RequestMapping(value = "api/propiedades/{id}", method = RequestMethod.GET)
    public Propiedad obtenerPropiedad(@PathVariable int id) {
        return propiedadDao.obtenerPropiedad(id);
    }

    @RequestMapping(value = "api/propiedades", method = RequestMethod.GET)
    public List<Propiedad> obtenerListaPropiedades() {
        return propiedadDao.obtenerListaPropiedades();
    }

    @RequestMapping(value = "api/propiedades/{id}", method = RequestMethod.DELETE)
    public void eliminarPropiedad(@PathVariable int id) {
        propiedadDao.eliminarPropiedad(id);
    }
}
