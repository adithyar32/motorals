package com.motorals.motorals_backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motorals.motorals_backend.Entity.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
