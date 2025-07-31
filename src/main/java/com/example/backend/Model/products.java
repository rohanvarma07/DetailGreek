package com.example.backend.Model;

import jakarta.persistence.*; // Use jakarta.persistence for Spring Boot 3+

@Entity
@Table(name = "products") // Ensures it maps to the 'products' table
public class products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Using Long for ID, consistent with productId in ImageService

    private String name;
    private String image; // This field might be used for a default image URL or placeholder
    private Double price;
    private String category; // This is the crucial field that was missing or misspelled!
    private Double originalPrice;
    private Boolean featured;
    private Double rating;
    private Integer reviews;
    private Boolean inStock;

    // New fields added to store image information from ImageService
    private String imageUrl; // Stores the URL to access the image via the API
    private String imageFilename; // Stores the original filename
    private String imagePath; // Stores the local file system path

    // Default constructor (required by JPA)
    public products() {
    }

    // Constructor with essential fields (you can add more as needed)
    public products(String name, String image, Double price, String category, Boolean inStock) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.category = category;
        this.inStock = inStock;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviews() {
        return reviews;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageFilename() {
        return imageFilename;
    }

    public void setImageFilename(String imageFilename) {
        this.imageFilename = imageFilename;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
