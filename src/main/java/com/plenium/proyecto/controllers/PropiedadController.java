package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.PropiedadDao;
import com.plenium.proyecto.model.Propiedad;
import com.plenium.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PropiedadController {

    @Autowired
    PropiedadDao propiedadDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/propiedades", method = RequestMethod.POST)
    public void guardarNuevaPropiedad(@RequestHeader(value = "Authorization") String token, @RequestBody Propiedad propiedad) {
        if(!validarToken(token)){
            return;
        }
        propiedadDao.guardarNuevaPropiedad(propiedad);
    }

    @RequestMapping(value = "api/propiedades/{id}", method = RequestMethod.GET)
    public Propiedad obtenerPropiedad(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return null;
        }
        return propiedadDao.obtenerPropiedad(id);
    }

    @RequestMapping(value = "api/propiedades", method = RequestMethod.GET)
    public List<Propiedad> obtenerListaPropiedades(@RequestHeader(value = "Authorization") String token) {
        if(!validarToken(token)){
            return null;
        }
        return propiedadDao.obtenerListaPropiedades();
    }

    @RequestMapping(value = "api/propiedades/{id}", method = RequestMethod.DELETE)
    public void eliminarPropiedad(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return;
        }
        propiedadDao.eliminarPropiedad(id);
    }

    private boolean validarToken(String token) {
        String idUsuario = jwtUtil.getKey(token);
        return idUsuario != null;
    }
}
