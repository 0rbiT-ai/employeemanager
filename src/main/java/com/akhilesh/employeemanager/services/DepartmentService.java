package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.Department;
import com.akhilesh.employeemanager.repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class DepartmentService {
    private final DepartmentRepo departmentRepo;
    @Autowired
    public DepartmentService(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    public List<Department> getAllDepartments(){
        return departmentRepo.findAll();
    }

    public Department getDepartmentById(UUID id){
        return departmentRepo.findById(id).
                orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Department Not Found"));
    }


    public List<Department> getDepartmentsByNameLocation(String departmentName, String location, String order, String dir){
        return departmentRepo.findDepartmentByNameLocation(departmentName,location,order,dir);
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
        departmentRepo.delete(department);
    }
}
