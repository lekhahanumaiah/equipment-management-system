package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.equipment.service.*;
import com.example.equipment.entity.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class MaintenanceController {

    private final MaintenanceService service;

    @PostMapping("/maintenance")
    public MaintenanceLog add(@RequestBody MaintenanceLog log) {
        return service.add(log);
    }

    @GetMapping("/equipment/{id}/maintenance")
    public List<MaintenanceLog> get(@PathVariable Long id) {
        return service.getByEquipment(id);
    }
}