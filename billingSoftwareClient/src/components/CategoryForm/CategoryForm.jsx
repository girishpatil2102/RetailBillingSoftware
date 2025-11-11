import React, { useState, useRef, useContext } from 'react';
import { assets } from '../../assets/assets.js';
import { addCategory } from '../../Service/CategoryService';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const MAX_DESCRIPTION_LENGTH = 255;

const CategoryForm = () => {
    const fileInputRef = useRef(null);
    const { setCategories } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        backgroundColor: '#212629'
    });

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
        
        // Basic validation
        if (!formData.name.trim()) {
            toast.error('enter a category name');
            return;
        }
        
        if (!formData.image) {
            toast.error('select an image');
            return;
        }
        
        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();
            
            // Create category object as JSON string
            const categoryData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                bgColor: formData.backgroundColor
            };
            
            // Append category as JSON string (backend expects "category" field)
            formDataToSend.append('category', JSON.stringify(categoryData));
            
            // Append file (backend expects "file" field)
            formDataToSend.append('file', formData.image);
            
            if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
            alert(`Description is too long. Maximum allowed is ${MAX_DESCRIPTION_LENGTH} characters.`);
            return;
            }

            console.log('Submitting category:', categoryData);
            console.log('File:', formData.image);
            console.log('FormData contents:');
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
            }
            
            const response = await addCategory(formDataToSend);
            console.log('Category added successfully:', response.data);
            
            toast.success('Category added successfully');
            
            // Update context with new category
            if (response.data) {
                setCategories(prev => [...prev, response.data]);
            }
            
            // Reset form
            setFormData({
                name: '',
                description: '',
                image: null,
                backgroundColor: '#808080'
            });
            
            // No need to reload the page anymore!
        } catch (error) {
            console.error('Error adding category:', error);
            console.error('Error response:', error.response);
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);
            console.error('Error response headers:', error.response?.headers);
            
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 
                                   error.response.data?.error || 
                                   error.response.data || 
                                   error.response.statusText;
                toast.error(`Failed to add category: ${errorMessage}`);
            } else if (error.request) {
                // Request was made but no response received
                toast.error('Failed to connect to server. Please check if the backend is running.');
            } else {
                // Something else happened
                toast.error('Failed to add category. Please try again.');
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <style>
                {`
                    .custom-input::placeholder {
                        color: #999 !important;
                        opacity: 1;
                    }
                `}
            </style>
            <h3 className="mb-4">Add New Category</h3>
            <div className="row w-100 justify-content-center">
                <div className="card col-md-12 form-container" style={{ maxWidth: '700px', backgroundColor: '#212629' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={assets.upload}
                                    alt="Upload Image"
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
                                    <span style={{ color: '#999' }}>No file chosen, please choose an image for this category</span>
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
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label text-white">Category Name</label>
                            <input
                                type="text"
                                className="form-control custom-input"
                                id="categoryName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter category name"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryDescription" className="form-label text-white">Description</label>
                            <textarea
                                className="form-control custom-input"
                                id="categoryDescription"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder={`Enter category description (max ${MAX_DESCRIPTION_LENGTH} characters)`}
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                            <small style={{color:'#999'}}>{formData.description.length} / {MAX_DESCRIPTION_LENGTH} characters</small>

                        </div>
                        <div className="mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="color"
                                    className="form-control form-control-color"
                                    id="backgroundColor"
                                    name="backgroundColor"
                                    value={formData.backgroundColor}
                                    onChange={handleChange}
                                    title="Choose background color"
                                    style={{ width: '50px', height: '40px', padding: '2px' }}
                                />
                                <label htmlFor="backgroundColor" className="form-label mb-0 text-white">Background Color</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add Category</button>
                    </form>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default CategoryForm;
