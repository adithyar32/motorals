package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.BookingDTO;
import com.motorals.motorals_backend.DTO.CreateBookingRequest;
import com.motorals.motorals_backend.DTO.UserDTO;
import com.motorals.motorals_backend.Entity.Bike;
import com.motorals.motorals_backend.Entity.Booking;
import com.motorals.motorals_backend.Entity.User;
import com.motorals.motorals_backend.Repository.BikeRepository;
import com.motorals.motorals_backend.Repository.BookingRepository;
import com.motorals.motorals_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BikeRepository bikeRepository;

    //fetch the profile of user
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Doesn't Exist"));

        UserDTO response = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(response);
    }

    //fetch the bookings by a specific user
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<Booking> bookings = bookingRepository.findByUserEmail(email);

        List<BookingDTO> result = bookings.stream()
                .map(b -> new BookingDTO(
                        b.getId(),
                        b.getUser().getId(),
                        b.getBike().getName(),
                        b.getBike().getRegistrationNumber(),
                        b.getStartTime(),
                        b.getEndTime(),
                        "Confirmed"
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

    //add a booking
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CreateBookingRequest request)
    {
        User user=userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()->new RuntimeException("User not found"));
        Bike bike=bikeRepository.findById(request.getBikeId())
                .orElseThrow(()->new RuntimeException("Bike not found"));

        if (!bike.isAvailable())
        {
            ResponseEntity.badRequest().body("Bike is not available for booking");
        }

        long hours=java.time.Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (hours<=0)
        {
            return ResponseEntity.badRequest().body("Invalid booking duration");
        }

        double totalCost=hours* bike.getPricePerHour();
        Booking booking=new Booking();
        booking.setBike(bike);
        booking.setUser(user);
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setTotalCost(totalCost);

        bike.setAvailable(false);
        bikeRepository.save(bike);
        bookingRepository.save(booking);

        return ResponseEntity.ok("Bike booked successfully");
    }
}
