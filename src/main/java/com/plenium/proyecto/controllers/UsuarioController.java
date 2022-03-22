package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.UsuarioDao;
import com.plenium.proyecto.model.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @Autowired
    UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {
        //Encriptación de la contraseña antes de ser almacenada en la BD
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String contrasenaEncriptada = argon2.hash(1, 1024, 1, usuario.getContrasena());
        usuario.setContrasena(contrasenaEncriptada);

        usuarioDao.registrarUsuario(usuario);
    }

}
