package com.example.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
@RequiredArgsConstructor
public class JsonLoader {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void loadJsonAndSaveToDb(String filePath) throws Exception {
        System.out.println("Reading JSON file from: " + filePath);
        File file = new File(filePath);
        if (!file.exists()) {
            throw new Exception("File not found: " + filePath);
        }
        // For now, just read the file to verify it works
        objectMapper.readTree(file);
        System.out.println("JSON file loaded successfully");
    }
}