package com.girish.billingSoftware.service;

import com.girish.billingSoftware.io.CategoryRequest;
import com.girish.billingSoftware.io.CategoryResponse;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request);
}
