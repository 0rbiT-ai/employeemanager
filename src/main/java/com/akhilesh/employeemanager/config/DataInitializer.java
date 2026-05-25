package com.akhilesh.employeemanager.config;

import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.repository.EmployeeRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepo employeeRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(EmployeeRepo employeeRepo, PasswordEncoder passwordEncoder) {
        this.employeeRepo = employeeRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if(employeeRepo.count()==0){
            Employee admin = new Employee();
            admin.setName("Admin");
            admin.setEmail("admin@company.com");
            admin.setPhone("9999999999");
            admin.setRole("Administrator");
            admin.setAuthRole("ADMIN");
            admin.setPassword(passwordEncoder.encode("admin123"));
            employeeRepo.save(admin);
            System.out.println("Admin created with:\nEmail:admin@company.com\nPassword:admin123");
        }
    }
}
