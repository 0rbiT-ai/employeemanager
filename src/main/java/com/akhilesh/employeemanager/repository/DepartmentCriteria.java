package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Department;

import java.util.List;

public interface DepartmentCriteria {
    List<Department> findDepartmentByNameLocation(String departmentName, String location, String order, String dir);
}
