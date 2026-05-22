package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.repository.AttendanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {
    private final AttendanceRepo attendanceRepo;
    @Autowired
    public AttendanceService(AttendanceRepo attendanceRepo){
        this.attendanceRepo = attendanceRepo;
    }


}
