import React, { useState, useEffect } from 'react';
import { fetchItems, deleteItem } from '../../Service/ItemService';
import { fetchCategories } from '../../Service/CategoryService';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadItems();
        loadCategories();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const response = await fetchItems();
            setItems(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('Failed to load items');
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await fetchCategories();
            // Map categoryId -> categoryName for easy lookup
            const map = {};
            response.data.forEach(cat => {
                const catId = cat.categoryId || cat.id || cat.uuid || cat._id;
                map[catId] = cat.name;
            });
            setCategories(map);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleDelete = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(itemId);
                setItems(prevItems => prevItems.filter(item => item.id !== itemId && item.itemId !== itemId && item._id !== itemId));
                alert('Item deleted successfully');
            } catch (err) {
                console.error('Error deleting item:', err);
                alert('Failed to delete item. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div>
                <h3>Items List</h3>
                <div className="text-center">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-light mt-2">Loading items...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h3>Items List</h3>
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button className="btn btn-sm btn-outline-light ms-2" onClick={loadItems}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h3>Items List</h3>
            {items.length === 0 ? (
                <div className="text-center text-muted">
                    <p>No items found</p>
                </div>
            ) : (
                <div className="list-group">
                    {items.map(item => {
                        const itemId = item.id || item.itemId || item._id;
                        const categoryName = categories[item.categoryId] || 'Unknown';

                        return (
                            <div
                                key={itemId}
                                className="list-group-item rounded mb-3 d-flex"
                                style={{
                                    backgroundColor: '#2a2f32',
                                    border: '1px solid #555',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Left: Image */}
                                {item.imgUrl && (
                                    <img
                                        src={item.imgUrl}
                                        alt={item.name}
                                        className="me-3 rounded"
                                        style={{ width: '120px', height: '100px', objectFit: 'cover' }}
                                    />
                                )}

                                {/* Right: Details + Delete */}
                                <div className="flex-grow-1 d-flex flex-column">
                                    <h5 className="mb-1 text-white">{item.name}</h5>
                                    <p className="mb-1 text-light"><strong>Category:</strong> {categoryName}</p>
                                    {item.description && (
                                        <p className="mb-1 text-light">{item.description}</p>
                                    )}
                                    <p className="mb-2 text-light"><strong>Price:</strong> ${item.price}</p>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm align-self-end"
                                        onClick={() => handleDelete(itemId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ItemList;
