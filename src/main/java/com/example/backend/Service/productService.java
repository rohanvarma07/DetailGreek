package com.example.backend.Service;

import com.example.backend.Model.products;
import com.example.backend.Repository.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class productService {
    private final repository productRepository; // Consider renaming 'repository' to 'ProductRepository' for clarity

    @Autowired // Inject ProductRepository
    public productService(repository productRepository) {
        this.productRepository = productRepository;
    }

    public List<products> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<products> getProductById(Long proId) {
        return productRepository.findById(Math.toIntExact(proId));
    }

    public List<products> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

}
