package com.example.server.service;

import com.example.server.model.reviewModel;
import com.example.server.repository.reviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class reviewService {

    @Autowired
    private reviewRepository reviewRepository;

    public List<reviewModel> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<reviewModel> getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId);
    }

    public reviewModel saveReview(reviewModel review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
