package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Inmueble;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class InmuebleDaoImpl implements InmuebleDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void guardarNuevoInmueble(Inmueble inmueble) {
        entityManager.merge(inmueble);
    }

    @Override
    public Inmueble obtenerInmueble(int id) {
        String select = "FROM Inmueble WHERE id = :id";
        return (Inmueble) entityManager.createQuery(select)
                .setParameter("id", id)
                .getResultList()
                .get(0);
    }

    @Override
    public List<Inmueble> obtenerListaInmuebles() {
        String select = "FROM Inmueble";
        return entityManager.createQuery(select).getResultList();
    }

    @Override
    public void eliminarInmueble(int id) {
        Inmueble inmueble = entityManager.find(Inmueble.class, id);
        entityManager.remove(inmueble);
    }

}
