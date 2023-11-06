package com.dimativator.weblab4_backend.controller;

import com.dimativator.weblab4_backend.PasswordDecoder;
import com.dimativator.weblab4_backend.model.User;
import com.dimativator.weblab4_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/authorize")
    public ResponseEntity<?> authorizeUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No such user");
        }
        if (!existingUser.getPassword().equals(PasswordDecoder.decode(user.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password failed");
        }
        return ResponseEntity.ok(user);
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }
        else {
            String passwordSHA256 = PasswordDecoder.decode(user.getPassword());
            user.setPassword(passwordSHA256);
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }
    }
}

