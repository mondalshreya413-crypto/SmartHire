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
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest request) {

        try {

            String token = userService.loginUser(
                    request.getEmail(),
                    request.getPassword()
            );

            User user = userService.getUserByEmail(
                    request.getEmail()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "isSucc", true,
                            "role", user.getRole()
                    )
            );

        } catch (RuntimeException exception) {

            exception.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "token", "",
                                    "isSucc", false,
                                    "message",
                                    "Invalid email or password"
                            )
                    );
        }
    }
}
