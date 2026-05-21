package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.Employee;
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
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Page<Employee> getAllEmployees(Pageable pageable){
        return employeeRepo.findAll(pageable);
    }
    public Employee getEmployeeById(UUID id){
        return employeeRepo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Employee Not Found"));
    }


    public List<Employee> getEmployeesByRole(String role){
        return employeeRepo.findEmployeesByRole(role);
    }
    public List<Employee> getEmployeesByDepartment(String departmentName){
        return employeeRepo.findEmployeesByDepartment(departmentName);
    }
    public Employee getEmployeeByEmail(String email){
        return employeeRepo.findEmployeeByEmail(email);
    }
    public Long getEmployeeCountInDepartment(String departmentName){
        return employeeRepo.countEmployeesInDepartment(departmentName);
    }
    public Page<Employee> getEmployeeByNameRoleDepartment(String employeeName, String employeeRole, String employeeDepartment,
                                                          String order, String dir, Pageable pageable){
        return employeeRepo.findEmployeesByNameRoleDepartment(employeeName,employeeRole,employeeDepartment,order,dir,pageable); // Criteria Search
    }

    public Employee addEmployee(Employee employee){
        return employeeRepo.save(employee);
    }
    public List<Employee> addAllEmployees(List<Employee> employees){
        return employeeRepo.saveAll(employees);
    }
    public Employee updateEmployeeById(UUID id, Employee updatedEmployee){
        Employee employee = getEmployeeById(id);
        employee.setName(updatedEmployee.getName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhone(updatedEmployee.getPhone());
        employee.setRole(updatedEmployee.getRole());
        employee.setDepartment(updatedEmployee.getDepartment());//dont update task and attendance since itll do automatically
        return employeeRepo.save(employee); // check if user exists with getById then replace with getter and setter
    }
    public void deleteEmployeeById(UUID id){
        Employee employee = getEmployeeById(id); // to prevent silent failure of .delete(id)
        employeeRepo.delete(employee);// find and pass employee
    }
}
