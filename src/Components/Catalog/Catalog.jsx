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
      <div className="row">
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className="col-6 col-xs-12 col-sm-4 col-md-3 col-lg-2 my-3"
          >
            <Card>
              <Link to={`/catalog/first-level/${category.id}`}>
                <Card.Img
                  variant="top"
                  src="https://valtec.ru/image/groups/1.jpg"
                />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>This is an example React card</Card.Text>
                  <Button variant="primary">Example Button</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
