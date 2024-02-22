import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import CategoryService from "../services/CategoryService";
import "./Catalog.css";
import one from "../../Assets/1.png";
import two from "../../Assets/2.png";
import three from "../../Assets/3.png";
import four from "../../Assets/4.png";
import { isMobile, isBrowser } from 'react-device-detect';

export const Catalog = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [carousels, setCarousels] = useState([
    {id: 1, imageSrc: one, link: "https://santehplast.kz/catalog/1463/products/1460"},
    {id: 2, imageSrc: two, link: "https://santehplast.kz/catalog/1465/products/1424"},
    {id: 3, imageSrc: three, link: "https://santehplast.kz/catalog/1477/products/1480/product/443"},
  ]);

  useEffect(() => {
    console.log('isMobile', isMobile, isBrowser);
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
        isBrowser && (
          <MDBCarousel showIndicators showControls className="bg-body-tertiary mt-4 slider_wrap">
          {
            carousels.map((item) => (
              <MDBCarouselItem itemId={item.id} className="slider" >
                <a href={item.link}>
                  <img src={item.imageSrc} className="d-block w-100" alt="..." />
                </a>
              </MDBCarouselItem>
            ))
          }
          </MDBCarousel>)
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
