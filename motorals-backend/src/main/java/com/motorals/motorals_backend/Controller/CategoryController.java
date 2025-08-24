package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.CategoryDTO;
import com.motorals.motorals_backend.Entity.Category;
import com.motorals.motorals_backend.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    //fetch all categories
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories()
    {
        List<Category> results = categoryRepository.findAll();
        List<CategoryDTO> categories = results.stream()
                .map(category -> new CategoryDTO(
                        category.getId(),
                        category.getName(),
                        category.getDescription()
                )).toList();

        return ResponseEntity.ok(categories);
    }
}
