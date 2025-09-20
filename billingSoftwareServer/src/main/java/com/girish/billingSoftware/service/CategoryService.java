package com.girish.billingSoftware.service;

import com.girish.billingSoftware.io.CategoryRequest;
import com.girish.billingSoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
