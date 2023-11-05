package com.dimativator.weblab4_backend.controller;


import com.dimativator.weblab4_backend.model.Shot;
import com.dimativator.weblab4_backend.repository.ShotRepository;
import com.dimativator.weblab4_backend.validation.HitChecker;
import com.dimativator.weblab4_backend.validation.ShotValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class ShotController {

    private ShotRepository shotRepository;

    private final ShotValidator shotValidator = new ShotValidator();
    private final HitChecker hitChecker = new HitChecker();

    @Autowired
    public void setShotRepository(ShotRepository shotRepository) {
        this.shotRepository = shotRepository;
    }

    @GetMapping("/shots")
    public List<Shot> getAllShots() {
        return shotRepository.findAll();
    }


    @PostMapping("/shots")
    public ResponseEntity<?> createShot(@RequestBody Shot shot) {
        double startTime = System.nanoTime();

        if (shotValidator.validate(shot)) {
            shot.setHit(hitChecker.checkHit(shot));

            double endTime = System.nanoTime();
            double responseTime = endTime - startTime;

            shot.setResponseTime(responseTime);

            Shot savedShot = shotRepository.save(shot);

            return ResponseEntity.ok(savedShot);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation failed");
    }

    @DeleteMapping("/shots")
    public ResponseEntity<?> clearAllShots() {
        try {
            shotRepository.deleteAll();
            return ResponseEntity.ok("All shots deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting shots");
        }
    }

}
