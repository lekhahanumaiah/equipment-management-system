package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.equipment.service.*;
import com.example.equipment.entity.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
@CrossOrigin
public class EquipmentController {

    private final EquipmentService service;

    @GetMapping
    public List<Equipment> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Equipment create(@RequestBody Equipment equipment) {
        return service.save(equipment);
    }

    @PutMapping("/{id}")
    public Equipment update(@PathVariable Long id,
                            @RequestBody Equipment equipment) {
        equipment.setId(id);
        return service.save(equipment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}