package com.motorals.motorals_backend.Repository;



import com.motorals.motorals_backend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long>{
    Optional<Category> findByName(String name);
}
