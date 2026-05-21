package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DepartmentCriteria {
    Page<Department> findDepartmentByNameLocation(String departmentName, String location, String order, String dir, Pageable pageable);
}
