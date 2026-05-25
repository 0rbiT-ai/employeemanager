package com.akhilesh.employeemanager.services;

import com.akhilesh.employeemanager.entities.Attendance;
import com.akhilesh.employeemanager.entities.AttendanceSession;
import com.akhilesh.employeemanager.entities.Employee;
import com.akhilesh.employeemanager.repository.AttendanceRepo;
import com.akhilesh.employeemanager.repository.AttendanceSessionRepo;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.accessibility.AccessibleText;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AttendanceService {
    private final AttendanceRepo attendanceRepo;
    private final AttendanceSessionRepo attendanceSessionRepo;
    @Autowired
    public AttendanceService(AttendanceRepo attendanceRepo, AttendanceSessionRepo attendanceSessionRepo){
        this.attendanceRepo = attendanceRepo;
        this.attendanceSessionRepo = attendanceSessionRepo;
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

    public Attendance getOrCreateTodayAttendance(Employee employee){
        LocalDate date = LocalDate.now();
        return attendanceRepo.findByEmployeeAndDate(employee,date).orElseGet(()->{
            Attendance newAttendance = new Attendance(date,"PRESENT",employee);
            newAttendance.setAttendanceSessions(new ArrayList<>());
            return attendanceRepo.save(newAttendance);
        });
    }

    public AttendanceSession checkInEmployee(Employee employee){
        Attendance attendance = getOrCreateTodayAttendance(employee);

        boolean hasActiveSession = attendance.getAttendanceSessions().stream().anyMatch(session -> session.getCheckOut() == null);
        if(hasActiveSession){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"You are already checked-in. Session Active. Check-out first");
        }
        AttendanceSession attendanceSession = new AttendanceSession(LocalTime.now(),null,attendance);
        return attendanceSessionRepo.save(attendanceSession);
    }

    public AttendanceSession checkOutEmployee(Employee employee){
        LocalDate date = LocalDate.now();
        Attendance attendance = attendanceRepo.findByEmployeeAndDate(employee,date)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST,"No Attendance recorded for today."));

        AttendanceSession activeSession = attendance.getAttendanceSessions().stream().filter((session)->{
            return session.getCheckOut()==null;
        }).findFirst().orElseThrow(()->new ResponseStatusException(HttpStatus.BAD_REQUEST,"No Active Session Found. Check-in first"));
        activeSession.setCheckOut(LocalTime.now());
        return attendanceSessionRepo.save(activeSession);
    }

    public List<Attendance> getEmployeeHistory(Employee employee){
        return attendanceRepo.findByEmployeeOrderByDateDesc(employee);
    }

}
