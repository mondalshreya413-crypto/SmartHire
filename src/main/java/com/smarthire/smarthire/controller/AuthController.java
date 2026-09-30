package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.LoginRequest;
import com.smarthire.smarthire.dto.RegisterRequest;
import com.smarthire.smarthire.model.User;
import com.smarthire.smarthire.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @Valid @RequestBody LoginRequest request) {

        String token = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(
                Map.of("token", token)
        );
    }
}