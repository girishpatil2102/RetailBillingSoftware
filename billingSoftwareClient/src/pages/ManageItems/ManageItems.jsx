import React from 'react';
import './ManageItems.css';
import ItemForm from '../../components/ItemForm/ItemForm';
import ItemList from '../../components/ItemList/ItemList';

const ManageItems = () => {
    return (
        <div className="item-container text-light">
            <div className="left-column overflow-y-auto overflow-x-hidden">
                <ItemForm />
            </div>
            <div className="right-coloumn overflow-y-auto overflow-x-hidden">
                <ItemList />
            </div>
        </div>
    );
};

export default ManageItems;
