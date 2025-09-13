package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.BikeDTO;
import com.motorals.motorals_backend.DTO.BookingDTO;
import com.motorals.motorals_backend.DTO.CategoryDTO;
import com.motorals.motorals_backend.DTO.UserDTO;
import com.motorals.motorals_backend.Entity.Bike;
import com.motorals.motorals_backend.Entity.Booking;
import com.motorals.motorals_backend.Entity.Category;
import com.motorals.motorals_backend.Repository.BikeRepository;
import com.motorals.motorals_backend.Repository.BookingRepository;
import com.motorals.motorals_backend.Repository.CategoryRepository;
import com.motorals.motorals_backend.Repository.UserRepository;
import com.motorals.motorals_backend.Service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BikeRepository bikeRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    //admin dashboard
    @GetMapping("/dashboard")
    public String dashboard()
    {
        return "dashboard hit successfully";
    }

    //adding of a bike
    @PostMapping(value = "/bikes", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> addBike(
            @RequestPart("bike") BikeDTO bikeDTO,
            @RequestPart("file") MultipartFile imageFile) throws IOException {

        Category category = categoryRepository.findByName(bikeDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Bike bike = new Bike();
        bike.setBrand(bikeDTO.getBrand());
        bike.setModel(bikeDTO.getModel());
        bike.setRegistrationNumber(bikeDTO.getRegistrationNumber());
        bike.setPricePerHour(bikeDTO.getPricePerHour());
        bike.setCategory(category);

        if (imageFile != null && !imageFile.isEmpty()) {
            // Upload file to Cloudinary
            Map uploadResult = cloudinaryService.uploadFile(imageFile);
            bike.setImageUrl((String) uploadResult.get("url"));           // save Cloudinary URL
            bike.setImagePublicId((String) uploadResult.get("public_id")); // save Cloudinary publicId
        }
        else {
            throw new RuntimeException("Either an image file or image URL must be provided");
        }

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
                bike.getPricePerHour(),
                bike.getImageUrl(),
                bike.getImagePublicId(),
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

    //get all users
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers()
    {
        List<UserDTO> users= userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    //get all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<Booking> bookings = bookingRepository.findAll();

        ZoneId indiaZone = ZoneId.of("Asia/Kolkata");
        LocalDateTime now = LocalDateTime.now(indiaZone);

        List<BookingDTO> result = bookings.stream()
                .map(b -> {
                    String status;
                    if (b.getEndTime().isBefore(now)) {
                        status = "Completed";
                    } else if (b.getStartTime().isAfter(now)) {
                        status = "Upcoming";
                    } else {
                        status = "Ongoing";
                    }

                    return new BookingDTO(
                            b.getId(),
                            b.getUser().getId(),
                            b.getBike().getName(),
                            b.getBike().getRegistrationNumber(),
                            b.getStartTime(),
                            b.getEndTime(),
                            status,
                            b.getTotalCost()
                    );
                })
                .toList();


        return ResponseEntity.ok(result);
    }


}
