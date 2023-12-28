import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, Outlet } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import { Card } from "react-bootstrap";

export const CatalogFirstLevelCategory = () => {
  const [categories, setCategories] = useState([]);
  const params = useParams();

  useEffect(() => {
    CategoryService.findByParentId(params.id).then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
              <Link to={`products/${category.id}`}>
                <div
                  className="card"
                  style={{ width: "10rem", height: "15rem" }}
                >
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
                      {category.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
