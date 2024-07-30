package com.example.server.repository;

import com.example.server.model.planModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface planRepository extends JpaRepository<planModel, Long> {
}
