import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams } from "react-router-dom";

export const Product = () => {
  const [records, setRecords] = useState([]);

  const params = useParams();

  return (
    <section className="cat_prod">
      <>
        {records
          .filter((r) => r.product === params.id)
          .map((posts) => (
            <Link to={`/category_1/${posts.name}`}>
              <div className="cards ">
                <div className="image-container image_box">
                  <img src={posts.image} alt="" />
                </div>
                <div className="details">
                  <p>{posts.name}</p>
                  <p>{posts.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </>
    </section>
  );
};
