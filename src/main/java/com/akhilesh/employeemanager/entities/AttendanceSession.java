package com.akhilesh.employeemanager.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "attendance_sessions")
public class AttendanceSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private LocalTime checkIn;
    private LocalTime checkOut;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="attendance_id")
    private Attendance attendance;

    public AttendanceSession(LocalTime checkIn, LocalTime checkOut, Attendance attendance) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.attendance = attendance;
    }

    public AttendanceSession() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Attendance getAttendance() {
        return attendance;
    }

    public void setAttendance(Attendance attendance) {
        this.attendance = attendance;
    }

    public LocalTime getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalTime checkIn) {
        this.checkIn = checkIn;
    }

    public LocalTime getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalTime checkOut) {
        this.checkOut = checkOut;
    }
}
