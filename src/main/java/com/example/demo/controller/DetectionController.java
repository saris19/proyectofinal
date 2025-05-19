package com.example.demo.controller;

import com.example.demo.service.AnalysisService;
import com.example.demo.service.DTO.DetectionJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detections")
public class DetectionController {

    @Autowired
    private AnalysisService analysisService;

    @PostMapping("/analyze/{strategy}")
    public String analyzeDetection(
        @PathVariable String strategy,
        @RequestBody DetectionJson detection
    ) {
        analysisService.processDetection(strategy, detection);
        return "Análisis completado con estrategia: " + strategy;
    }
}
