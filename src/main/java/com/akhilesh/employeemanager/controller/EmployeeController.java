package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.services.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable UUID id){
        return new ResponseEntity<>(employeeService.getEmployeeById(id),HttpStatus.OK);
    }


    @GetMapping("/role/{role}")
    public ResponseEntity<List<Employee>> getEmployeesByRole(@PathVariable String role){
        return new ResponseEntity<>(employeeService.getEmployeesByRole(role),HttpStatus.OK);
    }
    @GetMapping("/department/{departmentName}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartment(@PathVariable String departmentName){
        return new ResponseEntity<>(employeeService.getEmployeesByDepartment(departmentName),HttpStatus.OK);
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email){
        return new ResponseEntity<>(employeeService.getEmployeeByEmail(email),HttpStatus.OK);
    }
    @GetMapping("/count/department/{departmentName}")
    public ResponseEntity<Long> getEmployeeCountInDepartment(@PathVariable String departmentName){
        return new ResponseEntity<>(employeeService.getEmployeeCountInDepartment(departmentName),HttpStatus.OK);
    }
    @GetMapping("/name/{employeeName}")
    public ResponseEntity<List<Employee>> getEmployeesByName(@PathVariable String employeeName){
        return new ResponseEntity<>(employeeService.getEmployeeByName(employeeName),HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.addEmployee(employee),HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable UUID id, @RequestBody Employee updatedEmployee){
        return new ResponseEntity<>(employeeService.updateEmployeeById(id,updatedEmployee),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable UUID id){
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>("Employee Deleted Successfully.", HttpStatus.OK);
    }
}
