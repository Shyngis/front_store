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
      <div className="container-fluid my-4">
        <div className="row justify-content-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2 my-3"
            >
              <Card style={{ width: "10rem" }}>
                <Link
                  to={`products/${category.id}`}
                  className="card-link d-block h-100"
                >
                  <Card.Img variant="top" src={category.image} />
                  <Card.Body style={{ width: "10rem" }}>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="overflow-hidden text-ellipsis">
                      {category.description}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
