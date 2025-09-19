package com.girish.billingSoftware.service.impl;

import com.girish.billingSoftware.entity.CategoryEntity;
import com.girish.billingSoftware.io.CategoryRequest;
import com.girish.billingSoftware.io.CategoryResponse;
import com.girish.billingSoftware.repository.CategoryRepository;
import com.girish.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repository;
    @Override
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory = convertToEntity(request);
        newCategory = repository.save(newCategory);
        return convertToResponse(newCategory);

    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}
