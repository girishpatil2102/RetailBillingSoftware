package com.girish.billingSoftware.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.girish.billingSoftware.io.CategoryRequest;
import com.girish.billingSoftware.io.CategoryResponse;
import com.girish.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file")MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        CategoryRequest req = null;
        try {
            req = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(req, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Exception occurred while passing the JSON: "+e.getMessage());
        }

        // Pass DTO + file to service

    }

    @GetMapping
    public List<CategoryResponse> fetchCategories(){
        return categoryService.read();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/categories/{categoryId}")
    void remove(@PathVariable String categoryId){
        try{
        categoryService.delete(categoryId);
    } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found: "+ categoryId);
        }
    }

}
