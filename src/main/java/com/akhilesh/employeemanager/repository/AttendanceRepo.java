package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AttendanceRepo extends JpaRepository<Attendance, UUID> {
}
