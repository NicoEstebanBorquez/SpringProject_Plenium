package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Cliente;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class ClienteDaoImpl implements ClienteDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void guardarNuevoCliente(Cliente cliente) {
        entityManager.merge(cliente);
    }

    @Override
    public Cliente obtenerCliente(int id) {
        String select = "FROM Cliente WHERE id = :id";
        return (Cliente) entityManager.createQuery(select)
                .setParameter("id", id)
                .getResultList()
                .get(0);
    }

    @Override
    public List<Cliente> obtenerListaClientes() {
        String select = "FROM Cliente";
        return entityManager.createQuery(select).getResultList();
    }

    @Override
    public void eliminarCliente(int id) {
        Cliente cliente = entityManager.find(Cliente.class, id);
        entityManager.remove(cliente);
    }
}
