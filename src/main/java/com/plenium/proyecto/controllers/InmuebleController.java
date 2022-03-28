package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.InmuebleDao;
import com.plenium.proyecto.model.Inmueble;
import com.plenium.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InmuebleController {

    @Autowired
    InmuebleDao inmuebleDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/inmuebles", method = RequestMethod.POST)
    public void guardarNuevoInmueble(@RequestHeader(value = "Authorization") String token, @RequestBody Inmueble inmueble) {
        if(!validarToken(token)){
            return;
        }
        inmuebleDao.guardarNuevoInmueble(inmueble);
    }

    @RequestMapping(value = "api/inmuebles/{id}", method = RequestMethod.GET)
    public Inmueble obtenerInmueble(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return null;
        }
        return inmuebleDao.obtenerInmueble(id);
    }

    @RequestMapping(value = "api/inmuebles", method = RequestMethod.GET)
    public List<Inmueble> obtenerListaInmuebles(@RequestHeader(value = "Authorization") String token) {
        if(!validarToken(token)){
            return null;
        }
        return inmuebleDao.obtenerListaInmuebles();
    }

    @RequestMapping(value = "api/inmuebles/{id}", method = RequestMethod.DELETE)
    public void eliminarInmueble(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return;
        }
        inmuebleDao.eliminarInmueble(id);
    }

    private boolean validarToken(String token) {
        String idUsuario = jwtUtil.getKey(token);
        return idUsuario != null;
    }
}
