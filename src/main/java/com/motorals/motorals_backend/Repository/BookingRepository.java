package com.motorals.motorals_backend.Repository;

import com.motorals.motorals_backend.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Book;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByBikeId(Long bikeId);
    List<Booking> findByUserEmail(String email);
}
