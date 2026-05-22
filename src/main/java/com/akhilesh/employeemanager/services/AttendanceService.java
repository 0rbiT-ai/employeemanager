package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.Attendance;
import com.akhilesh.employeemanager.repository.AttendanceRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class AttendanceService {
    private final AttendanceRepo attendanceRepo;
    @Autowired
    public AttendanceService(AttendanceRepo attendanceRepo){
        this.attendanceRepo = attendanceRepo;
    }

    public Attendance getAttendanceById(UUID id){
        return attendanceRepo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"No Attendance Found"));
    }

    public List<Attendance> getAllAttendances(){
        return attendanceRepo.findAll();
    }

    public Attendance addAttendance(Attendance attendance){
        return attendanceRepo.save(attendance);
    }

    public List<Attendance> addAllAttendance(List<Attendance> attendances){
        return attendanceRepo.saveAll(attendances);
    }

    public Attendance updateAttendanceById(UUID id, Attendance updatedAttendance){
        Attendance attendance = getAttendanceById(id);

        attendance.setDate(updatedAttendance.getDate());
        attendance.setStatus(updatedAttendance.getStatus());
        attendance.setEmployee(updatedAttendance.getEmployee());

        return attendanceRepo.save(attendance);
    }

    public void deleteAttendanceById(UUID id){
        Attendance attendance = getAttendanceById(id);
        attendanceRepo.delete(attendance);
    }

}
