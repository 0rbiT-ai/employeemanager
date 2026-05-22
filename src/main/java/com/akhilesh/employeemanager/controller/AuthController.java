package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.dto.AuthRequestDTO;
import com.akhilesh.employeemanager.dto.AuthResponseDTO;
import com.akhilesh.employeemanager.services.CustomUserDetailsService;
import com.akhilesh.employeemanager.services.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final CustomUserDetailsService
            customUserDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, CustomUserDetailsService customUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDTO){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(),authRequestDTO.getPassword()));
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequestDTO.getEmail());
        String token = jwtService.generateToken(userDetails);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }
}
