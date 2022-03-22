package com.plenium.proyecto.dao;

import com.plenium.proyecto.model.Usuario;

public interface UsuarioDao {

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
    void registrarUsuario(Usuario usuario);
}
