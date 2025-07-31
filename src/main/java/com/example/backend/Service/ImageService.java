package com.example.backend.Service;

import com.example.backend.Model.products;
import com.example.backend.Repository.repository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class ImageService {

    private final String uploadDir = "uploads/images/";

    @Autowired
    private repository productRepository;

    public String saveImage(MultipartFile file, Long productId) throws IOException {
        // Create uploads directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = productId + "_" + System.currentTimeMillis() + extension;

        // Save file to local storage
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath);

        // Update product in database
        Optional<products> productOpt = productRepository.findById(Math.toIntExact(productId));
        if (productOpt.isPresent()) {
            products product = productOpt.get();
            product.setImageUrl("/api/images/" + uniqueFilename);
            product.setImageFilename(originalFilename);
            product.setImagePath(filePath.toString());
            productRepository.save(product);
        }

        return "/api/images/" + uniqueFilename;
    }

    public Resource getImage(String filename) throws IOException {
        Path filePath = Paths.get(uploadDir).resolve(filename);
        UrlResource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return (Resource) resource;
        } else {
            throw new IOException("Image not found: " + filename);
        }
    }
}
