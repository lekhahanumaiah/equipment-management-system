package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.equipment.repository.*;
import com.example.equipment.entity.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepo;
    private final EquipmentRepository equipmentRepo;

    public MaintenanceLog add(MaintenanceLog log) {

        Equipment equipment = equipmentRepo
                .findById(log.getEquipmentId())
                .orElseThrow();

        equipment.setStatus("Active");
        equipment.setLastCleanedDate(log.getMaintenanceDate());

        equipmentRepo.save(equipment);

        return maintenanceRepo.save(log);
    }

    public List<MaintenanceLog> getByEquipment(Long id) {
        return maintenanceRepo.findByEquipmentId(id);
    }
}