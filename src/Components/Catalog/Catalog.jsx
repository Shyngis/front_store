import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import { Button, Card } from "react-bootstrap";
import CategoryService from "../services/CategoryService";
import "./Catalog.css";
import { CatalogFilter } from "./CatalogFilter";

export const Catalog = () => {
  const [mainCategories, setMainCategories] = useState([]);
  let [isValtec, setIsValtec] = useState(true);
  let [isSantec, setIsSantec] = useState(false);

  useEffect(() => {
    loadCategories(isSantec, isValtec);
  }, []);

  function toggle(type) {
    if (type === "valtec") {
      isValtec = true;
      isSantec = false;
    }
    if (type === "santec") {
      isValtec = false;
      isSantec = true;
    }
    setIsValtec(isValtec);
    setIsSantec(isSantec);
    loadCategories(isSantec, isValtec);
  }

  function loadCategories(isSantec, isValtec) {
    CategoryService.findSantecAndValtecByParentId(1, isSantec, isValtec).then(
      (result) => {
        setMainCategories(result);
      }
    );
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="product-filter">
              {/* Фильтр:&nbsp; */}
              <button
                className={
                  "btn btn-outline-danger " + (isValtec ? "active" : "")
                }
                onClick={() => toggle("valtec")}
              >
                Valtec
              </button>
              &nbsp;
              <button
                className={
                  "btn btn-outline-danger " + (isSantec ? "active" : "")
                }
                onClick={() => toggle("santec")}
              >
                Santec
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {mainCategories.map((item) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={item.category.id}
            >
              <Link
                to={`/catalog/${item.category.id}?isSantec=${isSantec}&isValtec=${isValtec}`}
              >
                <div className="card santehplast-card">
                  <img
                    src={`${imgPrefixURL}/${item.image.filename}`}
                    alt="valtecimg"
                    className="card-img-top"
                  />
                  <div className="card-body" style={{ overflow: "hidden" }}>
                    <p className="card-text">{item.category.name}</p>
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
