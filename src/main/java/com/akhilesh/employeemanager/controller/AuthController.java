package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.dto.AuthRequestDTO;
import com.akhilesh.employeemanager.dto.AuthResponseDTO;
import com.akhilesh.employeemanager.dto.RefreshTokenRequestDTO;
import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.entities.RefreshToken;
import com.akhilesh.employeemanager.services.CustomUserDetailsService;
import com.akhilesh.employeemanager.services.JwtService;
import com.akhilesh.employeemanager.services.RefreshTokenService;
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
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final CustomUserDetailsService
            customUserDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenService refreshTokenService, CustomUserDetailsService customUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDTO){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(),authRequestDTO.getPassword()));
        Employee employee = (Employee) customUserDetailsService.loadUserByUsername(authRequestDTO.getEmail());
        String token = jwtService.generateToken(employee);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(employee.getId());
        return new ResponseEntity<>(new AuthResponseDTO(token, refreshToken.getToken(),employee.getAuthRole()), HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO request){
        return refreshTokenService.getByToken(request.getRefreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getEmployee)
                .map(employee -> {
                    String newAccessToken = jwtService.generateToken(employee);
                    return new ResponseEntity<>(new AuthResponseDTO(newAccessToken,request.getRefreshToken(),employee.getAuthRole()),HttpStatus.OK);
                }).orElseThrow(()->{
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid Refresh Token");
                });
    }
}
