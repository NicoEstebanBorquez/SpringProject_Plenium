package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImpl implements UsuarioDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void registrarUsuario(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
        String select = "FROM Usuario WHERE email = :email";

        Usuario usuarioObtenido = (Usuario) entityManager.createQuery(select)
                .setParameter("email", usuario.getEmail())
                .getResultList().get(0);


        if (usuarioObtenido == null) {
            return null;
        }
        //Verificación de la contraseña
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String contrasenaEncriptada = usuarioObtenido.getContrasena();
        //Compara un hash con una contraseña

        if (argon2.verify(contrasenaEncriptada, usuario.getContrasena())) {
            return usuarioObtenido;
        }
        return null;
    }
}
