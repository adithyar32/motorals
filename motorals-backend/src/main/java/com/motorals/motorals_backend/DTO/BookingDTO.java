package com.motorals.motorals_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private Long userId;
    private String bikeModel;
    private String registrationNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private double totalCost;
}
