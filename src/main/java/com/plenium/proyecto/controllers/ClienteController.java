package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.ClienteDao;
import com.plenium.proyecto.model.Cliente;
import com.plenium.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClienteController {

    @Autowired
    ClienteDao clienteDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/clientes", method = RequestMethod.POST)
    public void guardarNuevoCliente(@RequestHeader(value = "Authorization") String token, @RequestBody Cliente cliente) {
        if(!validarToken(token)){
            return;
        }
        clienteDao.guardarNuevoCliente(cliente);
    }

    @RequestMapping(value = "api/clientes/{id}", method = RequestMethod.GET)
    public Cliente obtenerCliente(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return null;
        }
        return clienteDao.obtenerCliente(id);
    }

    @RequestMapping(value = "api/clientes", method = RequestMethod.GET)
    public List<Cliente> obtenerListaClientes(@RequestHeader(value = "Authorization") String token) {
        if(!validarToken(token)){
            return null;
        }
        return clienteDao.obtenerListaClientes();
    }

    @RequestMapping(value = "api/clientes/{id}", method = RequestMethod.DELETE)
    public void eliminarCliente(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if(!validarToken(token)){
            return;
        }
        clienteDao.eliminarCliente(id);
    }

    private boolean validarToken(String token) {
        String idUsuario = jwtUtil.getKey(token);
        return idUsuario != null;
    }
}
