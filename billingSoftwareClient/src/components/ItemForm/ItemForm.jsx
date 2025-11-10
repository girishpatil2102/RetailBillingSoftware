import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets.js';
import { addItem } from '../../Service/ItemService';
import { fetchCategories } from '../../Service/CategoryService';

const MAX_DESCRIPTION_LENGTH = 255;

const ItemForm = () => {
    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        price: '',
        image: null
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!formData.name.trim()) {
            alert('Please enter an item name');
            return;
        }

        if (!formData.categoryId) {
            alert('Please select a category');
            return;
        }

        if (!formData.price || isNaN(formData.price)) {
            alert('Please enter a valid price');
            return;
        }

        if (!formData.image) {
            alert('Please select an image for the item');
            return;
        }

        if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
            alert(`Description is too long. Maximum allowed is ${MAX_DESCRIPTION_LENGTH} characters.`);
            return;
        }

        try {
            const formDataToSend = new FormData();

            const itemData = {
                name: formData.name.trim(),
                categoryId: formData.categoryId,
                description: formData.description.trim(),
                price: parseFloat(formData.price)
            };

            formDataToSend.append('item', JSON.stringify(itemData));
            formDataToSend.append('file', formData.image);

            console.log("Submitting item:", itemData);

            const response = await addItem(formDataToSend);
            console.log("Item added:", response.data);

            alert("Item added successfully!");

            // Reset form
            setFormData({
                name: '',
                categoryId: '',
                description: '',
                price: '',
                image: null
            });

            // Optionally reload page to refresh item list
            window.location.reload();
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Failed to add item. Please try again.");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            {/* Placeholder color styling */}
            <style>
                {`
                    .custom-input::placeholder {
                        color: #999 !important;
                        opacity: 1;
                    }
                `}
            </style>

            <h3 className="mb-4">Add New Item</h3>
            <div className="row w-100 justify-content-center">
                <div className="card col-md-8 form-container" style={{ width: '700px', backgroundColor: '#212629' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={assets.upload}
                                    alt="Upload"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        border: '2px dashed #ccc',
                                        borderRadius: '4px',
                                        padding: '5px'
                                    }}
                                    onClick={handleUploadClick}
                                />
                                {formData.image ? (
                                    <span className="text-light">{formData.image.name}</span>
                                ) : (
                                    <span style={{ color: '#999' }}>
                                        No file chosen, please choose an image
                                    </span>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {/* Item Name */}
                        <div className="mb-3">
                            <label className="form-label text-white">Item Name</label>
                            <input
                                type="text"
                                className="form-control custom-input"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter item name"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="mb-3">
                            <label className="form-label text-white">Category</label>
                            <select
                                className="form-select custom-input"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label text-white">Description</label>
                            <textarea
                                className="form-control custom-input"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder={`Enter item description (max ${MAX_DESCRIPTION_LENGTH} characters)`}
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                            <small style={{color:'#999'}}>{formData.description.length} / {MAX_DESCRIPTION_LENGTH} characters</small>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label className="form-label text-white">Price</label>
                            <input
                                type="number"
                                className="form-control custom-input"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="Enter price"
                                step="0.01"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Add Item</button>
                    </form>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default ItemForm;
