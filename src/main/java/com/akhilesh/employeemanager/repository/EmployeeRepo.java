package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Department;
import com.akhilesh.employeemanager.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepo extends
        JpaRepository<Employee, UUID>,
        EmployeeRepoCustom,
        EmployeeCriteria {
    List<Employee> findByDepartment(Department department);
}
