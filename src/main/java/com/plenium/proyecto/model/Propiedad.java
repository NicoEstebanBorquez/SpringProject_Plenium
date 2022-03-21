package com.plenium.proyecto.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "propiedades")
public class Propiedad {

    @Getter @Setter
    @Column(name = "id_propiedad")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter @Setter
    @Column(name = "denominacion")
    private String denominacion;

    @Getter @Setter
    @Column(name = "poblacion")
    private String poblacion;

    @Getter @Setter
    @Column(name = "provincia")
    private String provincia;
}
