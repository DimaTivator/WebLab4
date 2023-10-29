package com.dimativator.weblab4_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Shots")
public class Shot {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Column(name="x_value")
    private double xValue;

    @Column(name="y_value")
    private double yValue;

    @Column(name="r_value")
    private double rValue;

    @Column(name="is_hit")
    private boolean isHit;

    @Column(name="response_time")
    private double responseTime;
}
