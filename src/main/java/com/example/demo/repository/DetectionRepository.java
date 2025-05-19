package com.example.demo.repository;

import com.example.demo.entity.Detection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
}

// ... existing code ...

