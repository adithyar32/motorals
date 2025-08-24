package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.BikeDTO;
import com.motorals.motorals_backend.DTO.CategoryDTO;
import com.motorals.motorals_backend.Entity.Bike;
import com.motorals.motorals_backend.Entity.Category;
import com.motorals.motorals_backend.Repository.BikeRepository;
import com.motorals.motorals_backend.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BikeRepository bikeRepository;
    private final CategoryRepository categoryRepository;

    //admin dashboard
    @GetMapping("/dashboard")
    public String dashboard()
    {
        return "dashboard hit successfully";
    }

    //adding of a bike
    @PostMapping("/bikes")
    public ResponseEntity<String> addBike(@RequestBody BikeDTO bikeDTO) {
        Category category = categoryRepository.findByName(bikeDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Bike bike = new Bike();
        bike.setBrand(bikeDTO.getBrand());
        bike.setModel(bikeDTO.getModel());
        bike.setRegistrationNumber(bikeDTO.getRegistrationNumber());
        bike.setAvailable(true);
        bike.setPricePerHour(bikeDTO.getPricePerHour());
        bike.setCategory(category);
        bike.setImageUrl(bikeDTO.getImageUrl());

        bikeRepository.save(bike);

        return ResponseEntity.ok("Bike added successfully");
    }

    //get a single bike by id
    @GetMapping("/bikes/{id}")
    public ResponseEntity<BikeDTO> getBikeById(@PathVariable Long id)
    {
        Bike bike=bikeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Bike with id:"+id+"doesn't exist"));

        BikeDTO bikeDTO = new BikeDTO(
                bike.getId(),
                bike.getBrand(),
                bike.getModel(),
                bike.getRegistrationNumber(),
                bike.isAvailable(),
                bike.getPricePerHour(),
                bike.getImageUrl(),
                bike.getCategory().getName()
        );
        return ResponseEntity.ok(bikeDTO);
    }

    //updating bike by id
    @PutMapping("bikes/{id}")
    public ResponseEntity<String> updateBike(@PathVariable Long id, @RequestBody BikeDTO bikeDTO)
    {
        Bike bike = bikeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bike not found"));

        Category category = categoryRepository.findByName(bikeDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        bike.setBrand(bikeDTO.getBrand());
        bike.setModel(bikeDTO.getModel());
        bike.setRegistrationNumber(bikeDTO.getRegistrationNumber());
        bike.setPricePerHour(bikeDTO.getPricePerHour());
        bike.setAvailable(bikeDTO.isAvailable());
        bike.setImageUrl(bikeDTO.getImageUrl());
        bike.setCategory(category);

        bikeRepository.save(bike);

        return ResponseEntity.ok("Bike updated successfully");
    }

    //delete a bike by id
    @DeleteMapping("bikes/{id}")
    public ResponseEntity<String> deleteBike(@PathVariable Long id)
    {
        if (!bikeRepository.existsById(id)) {
            throw new RuntimeException("Bike with id " + id + " doesn't exist");
        }

        bikeRepository.deleteById(id);
        return ResponseEntity.ok("Bike deleted successfully");
    }

    //add category
    @PostMapping("/categories")
    public ResponseEntity<String> addCategory(@RequestBody CategoryDTO categoryDTO)
    {
        Category category=new Category();

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        categoryRepository.save(category);

        return ResponseEntity.ok("Category added successfully");
    }


}
