import React, { useContext,useState } from "react";
import { AppContext } from "../../context/AppContext";
import './CategoryList.css';

const CategoryList = () => {
	const { categories, setCategories } = useContext(AppContext);

  const[searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByCategoryId = async (categoryId) => {
    try {
      const response = await deleteByCategoryId(categoryId);
      if(response.status ===204){
        const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
        setCategories(updatedCategories);
        //toast message
      } else{
        //toast message
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      //toast message
    }
  }
	return (
		<div className="category-list-container" style={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>

      
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" 
          name="keyword" 
          id="keyword" 
          placeholder="Search categories..." 
          className="form-control"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          />
          <span className="input-group-text bg-warning">
          <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
			<div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3" style={{ backgroundColor:category.bgColor}}>
            <div className="d-flex align-items-center">
              <div style={{marginRight: '15px'}}>
                <img src={category.imgUrl} alt={category.name} className="category-image"/>
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 text-white">{category.name}</h5>
                <p className="mb-0 text-white">{category.items} Items</p>
              </div>
              <div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteByCategoryId(category.id)}>
                  <i className="bi bi-trash">
                    
                  </i>
                </button>
              </div>
            </div>
            
          </div>
          </div>
        ))}
      </div>
		</div>
	);
};

export default CategoryList;
