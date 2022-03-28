package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Cliente;

import java.util.List;

public interface ClienteDao {

    void guardarNuevoCliente(Cliente cliente);
    Cliente obtenerCliente(int id);
    List<Cliente> obtenerListaClientes();
    void eliminarCliente(int id);
}
