package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Propiedad;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PropiedadDaoImpl implements PropiedadDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void guardarNuevaPropiedad(Propiedad propiedad) {
        entityManager.merge(propiedad);
    }

    @Override
    public Propiedad obtenerPropiedad(int id) {
        String select = "FROM Propiedad WHERE id = :id";
        return (Propiedad) entityManager.createQuery(select)
                .setParameter("id", id)
                .getResultList()
                .get(0);
    }

    @Override
    public List<Propiedad> obtenerListaPropiedades() {
        String select = "FROM Propiedad";
        return entityManager.createQuery(select).getResultList();
    }

    @Override
    public void eliminarPropiedad(int id) {
        Propiedad propiedad = entityManager.find(Propiedad.class, id);
        entityManager.remove(propiedad);
    }

}
