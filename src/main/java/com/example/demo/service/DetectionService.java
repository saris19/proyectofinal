package com.example.demo.service;

import com.example.demo.entity.Detection;
import com.example.demo.repository.DetectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DetectionService {
    private final DetectionRepository detectionRepository;
    private static final Logger logger = LoggerFactory.getLogger(DetectionService.class);

    /**
     * Guarda una lista de detecciones en la base de datos
     * @param detections Lista de detecciones a guardar
     * @throws IllegalArgumentException si la lista es nula o vacía
     */
    public void saveDetections(List<Detection> detections) {
        try {
            if (detections == null || detections.isEmpty()) {
                logger.error("Intento de guardar una lista de detecciones nula o vacía");
                throw new IllegalArgumentException("La lista de detecciones no puede ser nula o vacía");
            }
            detectionRepository.saveAll(detections);
            logger.info("Se guardaron {} detecciones exitosamente", detections.size());
        } catch (Exception e) {
            logger.error("Error al guardar las detecciones: {}", e.getMessage());
            throw new RuntimeException("Error al guardar las detecciones: " + e.getMessage());
        }
    }

    /**
     * Obtiene todas las detecciones almacenadas
     * @return Lista de todas las detecciones
     */
    public List<Detection> getAllDetections() {
        try {
            List<Detection> detections = detectionRepository.findAll();
            logger.info("Se recuperaron {} detecciones", detections.size());
            return detections;
        } catch (Exception e) {
            logger.error("Error al obtener las detecciones: {}", e.getMessage());
            throw new RuntimeException("Error al obtener las detecciones: " + e.getMessage());
        }
    }

    /**
     * Busca una detección por su ID
     * @param id ID de la detección
     * @return Optional con la detección si existe
     */
    public Optional<Detection> findById(Long id) {
        try {
            logger.info("Buscando detección con ID: {}", id);
            return detectionRepository.findById(id);
        } catch (Exception e) {
            logger.error("Error al buscar la detección con ID {}: {}", id, e.getMessage());
            throw new RuntimeException("Error al buscar la detección: " + e.getMessage());
        }
    }
}