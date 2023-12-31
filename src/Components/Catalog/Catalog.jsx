import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL, imgPrefixURL } from "../Common/ddata";
import { Button, Card } from "react-bootstrap";
import CategoryService from "../services/CategoryService";

export const Catalog = () => {
  const [mainCategories, setMainCategories] = useState([]);
  useEffect(() => {

    CategoryService.findByParentAndImageId(1).then(result => {
      setMainCategories(result);
    });


    // fetch(URL + "/category/parent/1")
    //   .then((response) => response.json())
    //   .then((mainCategories) => {
    //     setMainCategories(mainCategories);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        {/* <h1>{mainCategories.length}</h1> */}
        <div className="row">

          {mainCategories.map((item) => (
            <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
              <Link to={`/catalog/first-level/${item.category.id}`}>
                <div
                  className="card"
                  style={{ width: "10rem", height: "15rem" }}
                >
                  <img
                    src={`${imgPrefixURL}/${item.image.filename}`}
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
