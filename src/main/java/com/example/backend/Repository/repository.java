package com.example.backend.Repository;

import com.example.backend.Model.products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface repository extends JpaRepository<products,Integer> {
    List<products> findByCategory(String category);

}
