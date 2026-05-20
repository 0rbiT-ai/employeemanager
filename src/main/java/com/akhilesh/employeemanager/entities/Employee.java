package com.akhilesh.employeemanager.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String phone;
    private String role;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private List<Task> tasks;
    @JsonIgnore
    @OneToMany(mappedBy = "employee")
    private List<Attendance> attendances;

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Employee(){
    }

    public Employee(String name, String email, String phone, String role, Department department){
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.role=role;
        this.department = department;
    }


    public UUID getId(){
        return this.id;
    }

    public void setId(UUID id){
        this.id=id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getEmail(){
        return this.email;
    }

    public void setEmail(String email){
        this.email=email;
    }

    public String getPhone(){
        return this.phone;
    }

    public void setPhone(String phone){
        this.phone=phone;
    }

    public String getRole(){
        return this.role;
    }

    public void setRole(String role){
        this.role=role;
    }

    @Override
    public String toString(){
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<Attendance> getAttendances() {
        return attendances;
    }

    public void setAttendances(List<Attendance> attendances) {
        this.attendances = attendances;
    }
}
