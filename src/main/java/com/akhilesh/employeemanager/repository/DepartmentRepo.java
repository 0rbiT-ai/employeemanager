package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DepartmentRepo extends JpaRepository<Department, UUID> {
}
