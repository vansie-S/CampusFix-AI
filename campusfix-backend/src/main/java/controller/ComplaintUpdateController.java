package com.campusfix.campusfixbackend.controller;

import com.campusfix.campusfixbackend.entity.ComplaintUpdate;
import com.campusfix.campusfixbackend.service.ComplaintUpdateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaint-updates")
public class ComplaintUpdateController {

    private final ComplaintUpdateService complaintUpdateService;

    public ComplaintUpdateController(ComplaintUpdateService complaintUpdateService) {
        this.complaintUpdateService = complaintUpdateService;
    }

    @PostMapping
    public ComplaintUpdate createUpdate(@RequestBody ComplaintUpdate update) {
        return complaintUpdateService.createUpdate(update);
    }

    @GetMapping
    public List<ComplaintUpdate> getAllUpdates() {
        return complaintUpdateService.getAllUpdates();
    }

    @GetMapping("/{id}")
    public ComplaintUpdate getUpdateById(@PathVariable Long id) {
        return complaintUpdateService.getUpdateById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUpdate(@PathVariable Long id) {
        complaintUpdateService.deleteUpdate(id);
    }
}
