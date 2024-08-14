package com.example.server.controller;

import com.example.server.model.planModel;
import com.example.server.model.userModel;
import com.example.server.service.userService;
import com.example.server.service.planService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class userController {

    @Autowired
    private userService userService;

    @Autowired
    private planService planService;

    @GetMapping
    public ResponseEntity<List<userModel>> getAllUsers() {
        List<userModel> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<userModel> getUserById(@PathVariable Long id) {
        userModel user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody userModel user) {
        try {
            userModel savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // HTTP 409 Conflict
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<userModel> updateUser(@PathVariable Long id, @RequestBody userModel updatedUser) {
        userModel user = userService.updateUser(id, updatedUser);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<userModel> loginUser(@RequestBody userModel loginRequest) {
        userModel user = userService.authenticateUser(loginRequest.getEmail(),
                loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/updatePlan")
    public ResponseEntity<String> updateUserPlan(@RequestParam String email, @RequestBody planModel plan) {
        try {
            // Save or update the plan
            planModel savedPlan = planService.savePlan(plan);
            userModel updatedUser = userService.updateUserPlan(email, savedPlan);

            return ResponseEntity.ok("User plan updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update user plan: " + e.getMessage());
        }
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<userModel> getUserByEmail(@RequestParam String email) {
        try {
            userModel user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Return 404 if user is not found
        }
    }

    @GetMapping("/leaderboard")
    public List<userModel> getLeaderboard() {
        return userService.getLeaderboard();
    }

}
