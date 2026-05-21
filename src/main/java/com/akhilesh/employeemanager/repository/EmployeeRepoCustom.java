package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepoCustom {
    @Query("SELECT e FROM Employee e WHERE e.role=:role")
    public List<Employee> findEmployeesByRole(@Param("role") String role);

    @Query("SELECT e FROM Employee e WHERE e.department.departmentName = :departmentName")
    public List<Employee> findEmployeesByDepartment(@Param("departmentName") String departmentName);

    @Query("SELECT e FROM Employee e WHERE e.email = :email")
    public Employee findEmployeeByEmail(@Param("email") String email);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.department.departmentName = :departmentName")
    public Long countEmployeesInDepartment(@Param("departmentName") String departmentName);
}
