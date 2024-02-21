import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import CategoryService from "../services/CategoryService";
import "./Catalog.css";
import one from "../../Assets/1.png";
import two from "../../Assets/2.png";
import three from "../../Assets/3.png";
import four from "../../Assets/4.png";

export const Catalog = () => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    CategoryService.findByParentAndImageId(1).then(
      (result) => {
        setMainCategories(result);
      }
    );
  }

  return (
    <>
      {
      <MDBCarousel  fade interval={3000} className="bg-body-tertiary mt-4 slider_wrap">
        <MDBCarouselItem itemId={1} className="slider">
          <img src={one} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2} className="slider">
          <img src={two} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3} className="slider">
          <img src={three} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={4} className="slider">
          <img src={four} className="d-block w-100" alt="..." />
        </MDBCarouselItem>
      </MDBCarousel>
      }
      <div>
        <div className="row mt-4">
          {mainCategories.map((item) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={item.category.id}
            >
              <Link
                to={`/catalog/${item.category.id}`}
              >
                <div className="card santehplast-card">
                  <img
                    src={`${imgPrefixURL}/${item.image.filename}`}
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
