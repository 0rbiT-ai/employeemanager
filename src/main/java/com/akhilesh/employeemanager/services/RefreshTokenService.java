package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.RefreshToken;
import com.akhilesh.employeemanager.repository.EmployeeRepo;
import com.akhilesh.employeemanager.repository.RefreshTokenRepo;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private final RefreshTokenRepo refreshTokenRepo;
    @Autowired
    private final EmployeeRepo employeeRepo;

    public RefreshTokenService(RefreshTokenRepo refreshTokenRepo, EmployeeRepo employeeRepo) {
        this.refreshTokenRepo = refreshTokenRepo;
        this.employeeRepo = employeeRepo;
    }

    public RefreshToken createRefreshToken(UUID id){
        Optional<RefreshToken> existingRefreshToken = refreshTokenRepo.findByEmployeeId(id);
        if(existingRefreshToken.isPresent()){
            RefreshToken refreshToken = existingRefreshToken.get();
            refreshToken.setExpiryDate(new Date(System.currentTimeMillis()+1000L * 60 * 60 * 3));
            refreshToken.setToken(UUID.randomUUID().toString());
            return refreshTokenRepo.save(refreshToken);
        }
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setEmployee(employeeRepo.findById(id).orElseThrow());
        refreshToken.setExpiryDate(new Date(System.currentTimeMillis()+1000L * 60 * 60 * 3));
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepo.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().before(new Date())){
            refreshTokenRepo.delete(token);
            throw new ResponseStatusException(HttpStatus.NO_CONTENT,"Refresh token expired. Login again");
        }
        return token;
    }

    public Optional<RefreshToken> getByToken(String token){
        return refreshTokenRepo.findByToken(token);
    }
}
