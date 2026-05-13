package edu.ucaldas.backend.controller;

import edu.ucaldas.backend.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Long>> getUserStatistics(@PathVariable Long userId) {
        return ResponseEntity.ok(statisticsService.getTimeSpentPerApplication(userId));
    }
}
