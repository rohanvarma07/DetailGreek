package com.example.backend.Controller;

import com.example.backend.Model.products;
import com.example.backend.Service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class productController {
    private final productService service; // Renamed to 'service' for consistency

    @Autowired
    public productController(productService service) {
        this.service = service;
    }

    @GetMapping("/products")
    public List<products> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/products/{proId}")
    public ResponseEntity<products> getProductById(@PathVariable Long proId) { // Changed int to Long
        Optional<products> product = service.getProductById(proId);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/products/category/{categorySlug}")
    public ResponseEntity<List<products>> getProductsByCategory(@PathVariable String categorySlug) {
        List<products> products = service.getProductsByCategory(categorySlug);
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }
}
