package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.entities.Department;
import com.akhilesh.employeemanager.services.DepartmentService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page,size);
        return new ResponseEntity<>(departmentService.getAllDepartments(pageable).getContent(),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable UUID id){
        return new ResponseEntity<>(departmentService.getDepartmentById(id),HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Department>> getDepartmentsByNameLocation(@RequestParam(required = false) String departmentName,
                                                                         @RequestParam(required = false) String location,
                                                                         @RequestParam(required = false) String order,
                                                                         @RequestParam(required = false) String dir,
                                                                         @RequestParam(defaultValue = "0") int page,
                                                                         @RequestParam(defaultValue = "5") int size){
        Pageable pageable = PageRequest.of(page,size);
        return new ResponseEntity<>(departmentService.getDepartmentsByNameLocation(departmentName,location,order,dir,pageable).getContent(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Department> addDepartment(@RequestBody Department department){
        return new ResponseEntity<>(departmentService.addDepartment(department),HttpStatus.CREATED);
    }
    @PostMapping("/all")
    public ResponseEntity<List<Department>> addAllDepartments(@RequestBody List<Department> departments){
        return new ResponseEntity<>(departmentService.addAllDepartments(departments),HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartmentById(@PathVariable UUID id, @RequestBody Department updatedDepartment){
        return new ResponseEntity<>(departmentService.updateDepartmentById(id,updatedDepartment),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartmentById(@PathVariable UUID id){
        departmentService.deleteDepartmentById(id);
        return new ResponseEntity<>("Department Deleted Successfully.",HttpStatus.OK);
    }
}
