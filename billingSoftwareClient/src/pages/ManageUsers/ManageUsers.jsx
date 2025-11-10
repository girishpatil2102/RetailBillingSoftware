import React from 'react';
import './ManageUsers.css';
import UserForm from '../../components/UserForm/UserForm';
import UserList from '../../components/UserList/UserList';

const ManageUsers = () => {
    return (
        <div className="user-container text-light">
            <div className="left-column overflow-y-auto over">
                <UserForm />
            </div>
            <div className="right-coloumn overflow-auto">
                <UserList />
            </div>
        </div>
    );
};

export default ManageUsers;
