package com.example.server.controller;

import com.example.server.model.reviewModel;
import com.example.server.service.reviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class reviewController {

    @Autowired
    private reviewService reviewService;

    @GetMapping
    public ResponseEntity<List<reviewModel>> getAllReviews() {
        List<reviewModel> reviews = reviewService.getAllReviews();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<reviewModel> getReviewById(@PathVariable("id") Long id) {
        Optional<reviewModel> review = reviewService.getReviewById(id);
        return review.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<reviewModel> createReview(@RequestBody reviewModel review) {
        reviewModel savedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<reviewModel> updateReview(@PathVariable("id") Long id, @RequestBody reviewModel review) {
        if (!reviewService.getReviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        review.setReviewId(id);
        reviewModel updatedReview = reviewService.saveReview(review);
        return new ResponseEntity<>(updatedReview, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        if (!reviewService.getReviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
