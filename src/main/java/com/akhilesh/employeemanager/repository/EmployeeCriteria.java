package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;

import java.util.List;

public interface EmployeeCriteria {
    List<Employee> findEmployeesByNameRoleDepartment(String name,String role,String departmentName); // criteria search
}
