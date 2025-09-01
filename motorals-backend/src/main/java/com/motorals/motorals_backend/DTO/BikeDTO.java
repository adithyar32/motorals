package com.motorals.motorals_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BikeDTO {
    private Long id;
    private String brand;
    private String model;
    private String registrationNumber;
    private boolean available;
    private double pricePerHour;
    private String category;
    private String imageUrl;
    private String imagePublicId;
}
