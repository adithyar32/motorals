package com.motorals.motorals_backend.Repository;

import com.motorals.motorals_backend.Entity.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BikeRepository extends JpaRepository<Bike,Long> {
    List<Bike> findByAvailableTrue();
    List<Bike> findByCategory_Name(String category);
}
