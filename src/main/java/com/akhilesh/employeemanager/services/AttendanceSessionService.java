package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.repository.AttendanceSessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceSessionService {
    private final AttendanceSessionRepo attendanceSessionRepo;
    @Autowired
    public AttendanceSessionService(AttendanceSessionRepo attendanceSessionRepo) {
        this.attendanceSessionRepo = attendanceSessionRepo;
    }
}
