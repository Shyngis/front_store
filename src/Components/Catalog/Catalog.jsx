import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL } from "../Common/ddata";
import { Button, Card } from "react-bootstrap";

export const Catalog = () => {
  const [mainCategories, setMainCategories] = useState([]);
  useEffect(() => {
    fetch(URL + "/category/parent/1")
      .then((response) => response.json())
      .then((mainCategories) => {
        setMainCategories(mainCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {mainCategories.map((category) => (
            <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
              <Link to={`/catalog/first-level/${category.id}`}>
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
