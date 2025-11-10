import React from 'react';
import './ManageCategories.css';
import CategoryForm from '../../components/CategoryForm/CategoryForm';
import CategoryList from '../../components/CategoryList/CategoryList';

const ManageCategories = () => {
    return (
        <div className='category-container text-light'>
            <div className="left-column" style={{overflowY:'auto', overflowX:'hidden'}}>
                <CategoryForm />
            </div>
            <div className="right-column" style={{overflowY:'auto', overflowX:'hidden'}}>
                <CategoryList />
            </div>
        </div>
    );
};

export default ManageCategories;
