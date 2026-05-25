package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Attendance;
import com.akhilesh.employeemanager.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AttendanceRepo extends JpaRepository<Attendance, UUID> {
    Optional<Attendance> findByEmployeeAndDate(Employee employee, LocalDate date);
    List<Attendance> findByEmployeeOrderByDateDesc(Employee employee);
}
