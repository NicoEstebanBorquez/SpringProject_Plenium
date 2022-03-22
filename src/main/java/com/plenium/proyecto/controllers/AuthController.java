package com.plenium.proyecto.controllers;

import com.plenium.proyecto.dao.UsuarioDao;
import com.plenium.proyecto.model.Usuario;
import com.plenium.proyecto.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String iniciarSesion(@RequestBody Usuario usuario) {

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogueado != null) {
            String token = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());
            return token;
        } else {
            return "error 401";
        }
    }


}
