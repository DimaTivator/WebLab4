package com.dimativator.weblab4_backend.controller;


import com.dimativator.weblab4_backend.model.Shot;
import com.dimativator.weblab4_backend.repository.ShotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class ShotController {

    private ShotRepository shotRepository;

    @Autowired
    public void setShotRepository(ShotRepository shotRepository) {
        this.shotRepository = shotRepository;
    }

    @GetMapping("/shots/")
    public List<Shot> getAllShots() {
        return shotRepository.findAll();
    }
}
