package com.campusfix.campusfixbackend.repository;

import com.campusfix.campusfixbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
