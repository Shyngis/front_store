import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import { Button, Card } from "react-bootstrap";
import CategoryService from "../services/CategoryService";
import "./Catalog.css";


export const Catalog = () => {

  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {

    CategoryService.findByParentAndImageId(1).then(result => {
      setMainCategories(result);
    });
  }, []);

  return (
    <>
      <div>
        <div className="row mt-3">
          {mainCategories.map((item) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={item.category.id}>
              <Link to={`/catalog/first-level/${item.category.id}`}>
                <div className="card santehplast-card">
                  <img
                    src={`${imgPrefixURL}/${item.image.filename}`}
                    alt="valtecimg"
                    className="card-img-top"
                  />
                  <div className="card-body" style={{ overflow: "hidden" }}>
                    <p className="card-text">
                      {item.category.name}
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
