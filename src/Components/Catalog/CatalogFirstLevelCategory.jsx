import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, Outlet } from "react-router-dom";
import CategoryService from "../services/CategoryService";




export const CatalogFirstLevelCategory = () => {
  
  const [categories, setCategories] = useState([]);
  const params = useParams();

  useEffect(() => {
    CategoryService.findByParentId(params.id).then(categories => {
      setCategories(categories)
    });
  }, []);

  return (

    <section className="cat_prod">
      <>
        {categories.map((category) => (
          <Link to={ `second-level/${category.id}`}>
            <div className="cards">
              <div className="image_box">
                <img src={category.image} alt="" />
              </div>
              <div className="details">
                <p>{category.name}</p>
                <p>{category.description}</p>
              </div>
            </div>
          </Link>
        ))}

      </>
    </section>
    
  );
};

