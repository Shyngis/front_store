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
      <div className="row" style={{ paddingLeft: "90px", paddingTop: "20px" }}>
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className="col-6 col-xs-12 col-sm-4 col-md-3 col-lg-2 my-3"
            style={{ width: "220px", height: "25  0px" }}
          >
            <Link to={`/catalog/first-level/${category.id}`}>
              <Card>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="https://valtec.ru/image/groups/1.jpg"
                    style={{
                      width: "150px",
                      height: "140px",
                      padding: "10px",

                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  />
                  <Card.Title style={{ height: "10px" }}>
                    {category.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
