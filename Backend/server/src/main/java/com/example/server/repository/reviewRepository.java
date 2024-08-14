package com.example.server.repository;

import com.example.server.model.reviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface reviewRepository extends JpaRepository<reviewModel, Long> {
    // You can define custom query methods here if needed
}
