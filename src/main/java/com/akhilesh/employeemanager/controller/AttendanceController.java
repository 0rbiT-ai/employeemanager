package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.entities.Attendance;
import com.akhilesh.employeemanager.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attendances")
public class AttendanceController {
    private final AttendanceService attendanceService;
    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        return new ResponseEntity<>(attendanceService.getAllAttendances(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable UUID id){
        return new ResponseEntity<>(attendanceService.getAttendanceById(id),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Attendance> addAttendance(@RequestBody Attendance attendance){
        return new ResponseEntity<>(attendanceService.addAttendance(attendance),HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendanceById(@PathVariable UUID id,
                                                                @RequestBody Attendance attendance){
        return new ResponseEntity<>(attendanceService.updateAttendanceById(id,attendance),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendanceById(@PathVariable UUID id){
        attendanceService.deleteAttendanceById(id);
        return new ResponseEntity<>("Attendance Deleted Successfully.",HttpStatus.OK);
    }
}
