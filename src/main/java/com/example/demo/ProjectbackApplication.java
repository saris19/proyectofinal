package com.example.demo;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.demo.service.JsonLoader;

@SpringBootApplication
@RequiredArgsConstructor
public class ProjectbackApplication {
    private static final Logger logger = LoggerFactory.getLogger(ProjectbackApplication.class);

    private final JsonLoader jsonLoader;

    @Value("${app.detections.file-path:}")
    private String detectionsFilePath;

    public static void main(String[] args) {
        SpringApplication.run(ProjectbackApplication.class, args);
    }

    @PostConstruct
    public void runOnStartup() {
        if (detectionsFilePath == null || detectionsFilePath.isEmpty()) {
            logger.warn("La propiedad 'app.detections.file-path' no está definida. No se importarán detecciones.");
            return;
        }
        try {
            jsonLoader.loadJsonAndSaveToDb(detectionsFilePath);
            logger.info("Detecciones importadas exitosamente");
        } catch (Exception e) {
            logger.error("Error al importar detecciones: {}", e.getMessage());
            // No lanzamos la excepción para permitir que la aplicación continúe
        }
    }
}
