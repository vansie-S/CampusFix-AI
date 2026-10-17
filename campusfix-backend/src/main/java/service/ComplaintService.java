package com.campusfix.campusfixbackend.service;

import com.campusfix.campusfixbackend.entity.Complaint;
import com.campusfix.campusfixbackend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import com.campusfix.campusfixbackend.entity.ComplaintUpdate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final AIService aiService;
    private final ComplaintUpdateService complaintUpdateService;



    public ComplaintService(
            ComplaintRepository complaintRepository,
            AIService aiService,
            ComplaintUpdateService complaintUpdateService) {

        this.complaintRepository = complaintRepository;
        this.aiService = aiService;
        this.complaintUpdateService = complaintUpdateService;
    }

    public Complaint createComplaint(Complaint complaint) {

        complaint.setCreatedAt(LocalDateTime.now());

        complaint.setStatus("OPEN");

        Map<String, String> aiResult =
                aiService.predictComplaint(complaint.getDescription());

        complaint.setCategory(aiResult.get("category"));
        complaint.setPriority(aiResult.get("priority"));

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id).orElse(null);
    }

    public Complaint updateStatus(Long id, String status) {

        Complaint complaint = complaintRepository.findById(id).orElse(null);

        if (complaint == null) {
            return null;
        }

        complaint.setStatus(status);

        if (status.equalsIgnoreCase("RESOLVED")) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        Complaint savedComplaint = complaintRepository.save(complaint);

        // Create an entry in complaint history
        ComplaintUpdate update = new ComplaintUpdate();

        update.setComplaintId(id);
        update.setUpdatedBy(1L);
        update.setMessage("Complaint status changed to " + status);

        complaintUpdateService.createUpdate(update);

        return savedComplaint;
    }

    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
}