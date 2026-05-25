package com.akhilesh.employeemanager.controller;

import com.akhilesh.employeemanager.entities.Attendance;
import com.akhilesh.employeemanager.entities.AttendanceSession;
import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class AttendanceController {
    private final AttendanceService attendanceService;
    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    //Employee endpoints
    @PostMapping("/api/attendances/checkin")
    public ResponseEntity<AttendanceSession> checkInEmployee(@AuthenticationPrincipal Employee loggedInEmployee){
        return new ResponseEntity<>(attendanceService.checkInEmployee(loggedInEmployee),HttpStatus.CREATED);
    }
    @PostMapping("/api/attendances/checkout")
    public ResponseEntity<AttendanceSession> checkOutEmployee(@AuthenticationPrincipal Employee loggedInEmployee){
        return new ResponseEntity<>(attendanceService.checkOutEmployee(loggedInEmployee),HttpStatus.OK);
    }
    @GetMapping("/api/attendances/today")
    public ResponseEntity<Attendance> getTodayAttendance(@AuthenticationPrincipal Employee loggedInEmployee){
        return new ResponseEntity<>(attendanceService.getOrCreateTodayAttendance(loggedInEmployee),HttpStatus.CREATED);
    }
    @GetMapping("/api/attendances/history")
    public ResponseEntity<List<Attendance>> getAttendanceHistory(@AuthenticationPrincipal Employee loggedInEmployee){
        return new ResponseEntity<>(attendanceService.getEmployeeHistory(loggedInEmployee),HttpStatus.OK);
    }

    //Admin endpoints
    @GetMapping("/api/admin/attendances/all")
    public ResponseEntity<List<Attendance>> getAllAttendances() {
        return new ResponseEntity<>(attendanceService.getAllAttendances(), HttpStatus.OK);
    }
    @GetMapping("/api/admin/attendances/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable UUID id){
        return new ResponseEntity<>(attendanceService.getAttendanceById(id),HttpStatus.OK);
    }
    /*
    @PostMapping
    public ResponseEntity<Attendance> addAttendance(@RequestBody Attendance attendance){
        return new ResponseEntity<>(attendanceService.addAttendance(attendance),HttpStatus.CREATED);
    }*/
    @PutMapping("/api/admin/attendances/{id}")
    public ResponseEntity<Attendance> updateAttendanceById(@PathVariable UUID id,
                                                                @RequestBody Attendance attendance){
        return new ResponseEntity<>(attendanceService.updateAttendanceById(id,attendance),HttpStatus.OK);
    }
    @DeleteMapping("/api/admin/attendances/{id}")
    public ResponseEntity<String> deleteAttendanceById(@PathVariable UUID id){
        attendanceService.deleteAttendanceById(id);
        return new ResponseEntity<>("Attendance Deleted Successfully.",HttpStatus.OK);
    }


}
