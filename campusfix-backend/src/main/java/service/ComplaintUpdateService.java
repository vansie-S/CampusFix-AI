package com.campusfix.campusfixbackend.service;

import com.campusfix.campusfixbackend.entity.ComplaintUpdate;
import com.campusfix.campusfixbackend.repository.ComplaintUpdateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintUpdateService {

    private final ComplaintUpdateRepository complaintUpdateRepository;

    public ComplaintUpdateService(ComplaintUpdateRepository complaintUpdateRepository) {
        this.complaintUpdateRepository = complaintUpdateRepository;
    }

    public ComplaintUpdate createUpdate(ComplaintUpdate update) {
        update.setUpdatedAt(java.time.LocalDateTime.now());
        return complaintUpdateRepository.save(update);
    }

    public List<ComplaintUpdate> getAllUpdates() {
        return complaintUpdateRepository.findAll();
    }

    public ComplaintUpdate getUpdateById(Long id) {
        return complaintUpdateRepository.findById(id).orElse(null);
    }

    public void deleteUpdate(Long id) {
        complaintUpdateRepository.deleteById(id);
    }
}