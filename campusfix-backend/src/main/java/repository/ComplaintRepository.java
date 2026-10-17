package com.campusfix.campusfixbackend.repository;

import com.campusfix.campusfixbackend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}