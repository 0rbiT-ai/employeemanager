package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployeeRepo extends JpaRepository<Employee, UUID> {
}
