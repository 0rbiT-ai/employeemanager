package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByEmployeeId(UUID employeeId);
}
