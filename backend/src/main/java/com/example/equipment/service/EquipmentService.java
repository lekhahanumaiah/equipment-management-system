package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.equipment.repository.*;
import com.example.equipment.entity.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository repo;

    public List<Equipment> getAll() {
        return repo.findAll();
    }

    public Equipment save(Equipment equipment) {

        if ("Active".equals(equipment.getStatus())
                && equipment.getLastCleanedDate() != null) {

            long days = ChronoUnit.DAYS.between(
                    equipment.getLastCleanedDate(),
                    LocalDate.now()
            );

            if (days > 30) {
                throw new RuntimeException(
                        "Equipment cannot be Active if last cleaned date is older than 30 days"
                );
            }
        }

        return repo.save(equipment);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Equipment findById(Long id) {
        return repo.findById(id).orElseThrow();
    }
}