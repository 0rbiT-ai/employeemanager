package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.AttendanceSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AttendanceSessionRepo extends JpaRepository<AttendanceSession, UUID> {
}
