package com.example.server.service;

import com.example.server.model.planModel;
import com.example.server.model.userModel;
import com.example.server.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class userService {

    @Autowired
    private userRepository userRepository;

    public List<userModel> getAllUsers() {
        return userRepository.findAll();
    }

    public userModel getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public userModel updateUser(Long id, userModel updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setUserName(updatedUser.getUserName());
            user.setAge(updatedUser.getAge());
            user.setBmi(updatedUser.getBmi());
            user.setGender(updatedUser.getGender());
            return userRepository.save(user);
        }).orElse(null);
    }

    public userModel saveUser(userModel user) {
        Optional<userModel> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public userModel authenticateUser(String email, String password) {
        Optional<userModel> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            return optionalUser.get();
        } else {
            return null;
        }
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public userModel getUserByEmail(String email) {
        Optional<userModel> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public userModel updateUserPlan(String email, planModel newPlan) {
        Optional<userModel> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            userModel user = userOptional.get();
            user.setPlan(newPlan);
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<userModel> getLeaderboard() {
        return userRepository.findAllUsersWithPlansOrderedByMonthlyTargetAchieved();
    }

}
