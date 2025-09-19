package com.girish.billingSoftware.controller;

import com.girish.billingSoftware.io.CategoryRequest;
import com.girish.billingSoftware.io.CategoryResponse;
import com.girish.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestBody CategoryRequest req){
        return categoryService.add(req);
    }
}
