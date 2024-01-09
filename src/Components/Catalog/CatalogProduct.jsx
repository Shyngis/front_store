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
    ProductService.findByCategory(category).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <div class="row">
        {products.map((product) => (
          <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`product/${product.id}`}>
              <div className="card santehplast-card">
                <img
                  src="https://valtec.ru/image/groups/1.jpg"
                  alt="valtecimg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">
                    {product.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
