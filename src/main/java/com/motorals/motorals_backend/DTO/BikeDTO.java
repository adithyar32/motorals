package com.motorals.motorals_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BikeDTO {
    private Long id;
    private String name;
    private String model;
    private String imageUrl;   // or use byte[] if inline image
    private String category;
    private boolean available;
}
