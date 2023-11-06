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
    public List<Shot> getAllShots(@RequestHeader("username") String username) {
        return shotRepository.findByUsername(username);
    }


    @PostMapping("/shots")
    public ResponseEntity<?> createShot(@RequestBody Shot shot, @RequestHeader("username") String username) {
        double startTime = System.nanoTime();

        shot.setUsername(username);

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
    public ResponseEntity<?> clearAllShots(@RequestHeader("username") String username) {
        try {
            List<Shot> shots = shotRepository.findByUsername(username);
            for (Shot shot : shots) {
                shotRepository.deleteById(shot.getId());
            }
            return ResponseEntity.ok("Shots for user " + username + " deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting shots");
        }
    }

}
