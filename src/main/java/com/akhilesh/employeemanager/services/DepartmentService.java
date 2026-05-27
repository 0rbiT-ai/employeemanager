package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.Department;
import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.repository.DepartmentRepo;
import com.akhilesh.employeemanager.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class DepartmentService {
    private final DepartmentRepo departmentRepo;
    private final EmployeeRepo employeeRepo;
    @Autowired
    public DepartmentService(DepartmentRepo departmentRepo, EmployeeRepo employeeRepo) {
        this.departmentRepo = departmentRepo;
        this.employeeRepo = employeeRepo;
    }

    public Page<Department> getAllDepartments(Pageable pageable){
        return departmentRepo.findAll(pageable);
    }

    public Department getDepartmentById(UUID id){
        return departmentRepo.findById(id).
                orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Department Not Found"));
    }


    public Page<Department> getDepartmentsByNameLocation(String departmentName, String location, String order, String dir,Pageable pageable){
        return departmentRepo.findDepartmentByNameLocation(departmentName,location,order,dir,pageable);
    }


    public Department addDepartment(Department department){
        return departmentRepo.save(department);
    }
    public List<Department> addAllDepartments(List<Department> departments){
        return departmentRepo.saveAll(departments);
    }
    public Department updateDepartmentById(UUID id, Department updatedDepartment){
        Department department = getDepartmentById(id);
        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setLocation(updatedDepartment.getLocation());
        return departmentRepo.save(department);
    }

    public void deleteDepartmentById(UUID id){
        Department department = getDepartmentById(id);
        List<Employee> employees = employeeRepo.findByDepartment(department);
        employeeRepo.deleteAll(employees);
        departmentRepo.delete(department);
    }
}
