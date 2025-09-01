package com.motorals.motorals_backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;
    private String brand;
    private String registrationNumber;
    private boolean available;
    private double pricePerHour;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


    @OneToMany(mappedBy = "bike",cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @Column(length = 500)
    private String imageUrl;

    private String imagePublicId;

    public String getName() {
        return brand + " " + model;
    }
}
