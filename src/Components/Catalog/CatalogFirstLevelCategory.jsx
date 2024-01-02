import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, Outlet } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import { imgPrefixURL } from "../Common/ddata";

export const CatalogFirstLevelCategory = () => {
  const [categories, setCategories] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log('params.id', params.id);
    CategoryService.findByParentAndImageId(params.id).then(result => {
      setCategories(result);
      console.log('afte call');
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
                    src={`${imgPrefixURL}/${category.image.filename}`}
                    alt="valtecimg"
                    className="card-img-top"
                  />
                  <div className="card-body" style={{ overflow: "hidden" }}>
                    <p
                      className="card-text"
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
