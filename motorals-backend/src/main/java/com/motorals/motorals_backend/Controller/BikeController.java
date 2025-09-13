package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.BikeDTO;
import com.motorals.motorals_backend.Entity.Bike;
import com.motorals.motorals_backend.Repository.BikeRepository;
import com.motorals.motorals_backend.Repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bikes")
public class BikeController {

    private final BikeRepository bikeRepository;
    private final BookingRepository bookingRepository;

    //fetch all bikes
    @GetMapping
    public ResponseEntity<List<BikeDTO>> getBikes()
    {
        List<Bike> results=bikeRepository.findAll();
        List<BikeDTO> bikes=results.stream()
                .map(bike -> new BikeDTO(
                        bike.getId(),
                        bike.getBrand(),
                        bike.getModel(),
                        bike.getRegistrationNumber(),
                        bike.getPricePerHour(),
                        bike.getCategory().getName(),
                        bike.getImageUrl(),
                        bike.getImagePublicId()
                )).toList();

        return ResponseEntity.ok(bikes);
    }

    //get a bike by its id
    @GetMapping("/{id}")
    public ResponseEntity<BikeDTO> getBikeById(@PathVariable long id)
    {
        Bike bike=bikeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Bike with id:"+id+" not found"));

        BikeDTO result=new BikeDTO();
        result.setId(bike.getId());
        result.setModel(bike.getModel());
        result.setBrand(bike.getBrand());
        result.setRegistrationNumber(bike.getRegistrationNumber());
        result.setPricePerHour(bike.getPricePerHour());
        result.setCategory(bike.getCategory().getName());
        result.setImageUrl(bike.getImageUrl());

        return ResponseEntity.ok(result);

    }

    //fetch bikes by category
    @GetMapping("/category/{id}")
    public ResponseEntity<List<BikeDTO>> getBikesByCategory(@PathVariable long id)
    {
        List<Bike> results = bikeRepository.findAll()
                .stream()
                .filter(bike -> bike.getCategory() != null && bike.getCategory().getId() == id)
                .toList();

        List<BikeDTO> bikes = results.stream()
                .map(bike -> new BikeDTO(
                        bike.getId(),
                        bike.getBrand(),
                        bike.getModel(),
                        bike.getRegistrationNumber(),
                        bike.getPricePerHour(),
                        bike.getCategory().getName(),
                        bike.getImageUrl(),
                        bike.getImagePublicId()
                )).toList();

        return ResponseEntity.ok(bikes);
    }

    //get all bikes available at specific time interval
    @GetMapping("/available")
    public ResponseEntity<List<BikeDTO>> getAvailableBikes(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime
    ) {
        List<Bike> allBikes = bikeRepository.findAll();

        List<BikeDTO> availableBikes = allBikes.stream()
                .filter(bike -> bookingRepository
                        .findByBikeIdAndStartTimeLessThanAndEndTimeGreaterThan(
                                bike.getId(), endTime, startTime
                        ).isEmpty()
                )
                .map(bike -> new BikeDTO(
                        bike.getId(),
                        bike.getBrand(),
                        bike.getModel(),
                        bike.getRegistrationNumber(),
                        bike.getPricePerHour(),
                        bike.getCategory().getName(),
                        bike.getImageUrl(),
                        bike.getImagePublicId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(availableBikes);
    }


}
