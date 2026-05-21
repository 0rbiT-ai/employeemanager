package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeCriteria {
    Page<Employee> findEmployeesByNameRoleDepartment(String name, String role, String departmentName, String order, String dir, Pageable pageable); // criteria search
}
