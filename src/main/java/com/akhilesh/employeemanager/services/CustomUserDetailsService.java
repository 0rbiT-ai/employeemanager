package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final EmployeeRepo employeeRepo;
    @Autowired
    public CustomUserDetailsService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return employeeRepo.findEmployeeByEmail(email).orElseThrow(()->new UsernameNotFoundException("User Not Found"));
    }
}
