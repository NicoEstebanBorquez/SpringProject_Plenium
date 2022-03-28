package com.plenium.proyecto.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Getter @Setter
    @Column(name = "id_cliente")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter @Setter
    @Column(name = "nombre")
    private String nombre;

    @Getter @Setter
    @Column(name = "primer_apellido")
    private String primerApellido;

    @Getter @Setter
    @Column(name = "segundo_apellido")
    private String segundoApellido;

    @Getter @Setter
    @Column(name = "documento_identidad")
    private String documentoIdentidad;

    @Getter @Setter
    @Column(name = "email")
    private String email;

    @Getter @Setter
    @Column(name = "telefono")
    private String telefono;
}
