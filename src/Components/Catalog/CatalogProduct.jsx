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
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`product/${product.id}`}>
              <div className="card" style={{ width: "10rem", height: "15rem" }}>
                <img
                  src="https://valtec.ru/image/groups/1.jpg"
                  alt="valtecimg"
                  class="card-img-top"
                />
                <div class="card-body" style={{ overflow: "hidden" }}>
                  <p
                    class="card-text"
                    style={{
                      overflow: "auto",
                      width: "10rem",
                      height: "4rem",
                      fontWeight: "bold",
                    }}
                  >
                    {product.name}
                  </p>
                  <p>{product.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
