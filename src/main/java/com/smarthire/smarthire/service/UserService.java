package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.RegisterRequest;
import com.smarthire.smarthire.model.User;
import com.smarthire.smarthire.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User registerUser(RegisterRequest request) {

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        String role = request.getRole();

        if (role == null ||
                (!role.equals("CANDIDATE")
                && !role.equals("RECRUITER"))) {

            role = "CANDIDATE";
        }

        String encodedPassword =
                passwordEncoder.encode(
                        request.getPassword()
                );

        User user = new User(
                null,
                request.getName(),
                request.getEmail(),
                encodedPassword,
                role
        );

        return userRepository.save(user);
    }

    public String loginUser(
            String email,
            String password) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        )
                );

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );
    }

    public User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found: " + email
                        )
                );
    }
}

