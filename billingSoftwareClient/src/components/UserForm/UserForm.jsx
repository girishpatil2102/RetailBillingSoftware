import React, { useState } from 'react';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Password validation (minimum 6 characters)
        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        console.log('User form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            password: ''
        });
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
            <h3 className="mb-4">Add New User</h3>
            <div className="row w-100 justify-content-center">
                <div className="card md-col-8 form-container" style={{ width: '700px', backgroundColor: '#212629' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label text-white">Full Name</label>
                            <input
                                type="text"
                                className="form-control custom-input"
                                id="userName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ex: John Doe"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label text-white">Email</label>
                            <input
                                type="email"
                                className="form-control custom-input"
                                id="userEmail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Ex: yourname@example.com"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPassword" className="form-label text-white">Password</label>
                            <input
                                type="password"
                                className="form-control custom-input"
                                id="userPassword"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="*********"
                                style={{ backgroundColor: '#2a2f32', color: 'white', border: '1px solid #555' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Add User</button>
                    </form>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default UserForm;
