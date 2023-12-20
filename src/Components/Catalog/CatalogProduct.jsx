import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, Outlet } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";




export const CatalogProduct = () => {
  
  const [products, setProducts] = useState([]);
  const params = useParams();
  const category = params.categoryId;

  useEffect(() => {
    ProductService.findByCategory(category).then(products => {
      setProducts(products)
    });
  }, []);

  return (

    <section className="cat_prod">
      <>
        {products.map((product) => (
          <Link to={ `product/${product.id}`}>
            <div className="cards">
              <div className="image_box">
                <img src={product.image} alt="" />
              </div>
              <div className="details">
                <p>{product.name}</p>
                <p>{product.description}</p>
              </div>
            </div>
          </Link>
        ))}

      </>
    </section>
    
  );
};

