import React from 'react';

const UserList = () => {
    // Sample data - replace with actual data from API/state
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' }
    ];

    return (
        <div>
            <h3>Users List</h3>
            <div className="list-group">
                {users.map(user => (
                    <div key={user.id} className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 text-white">{user.name}</h5>
                            <small className="text-muted">ID: {user.id}</small>
                        </div>
                        <p className="mb-1 text-light">{user.email}</p>
                        <small className="text-info">Role: {user.role}</small>
                        <div className="btn-group btn-group-sm mt-2" role="group">
                            <button type="button" className="btn btn-outline-primary">Edit</button>
                            <button type="button" className="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
