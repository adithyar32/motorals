package com.motorals.motorals_backend.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateBookingRequest {
    private long bikeId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
