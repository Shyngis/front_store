import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams } from "react-router-dom";
// import {records} from '../Common/ddata'

export const Product = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://161.97.144.45:8181/product")
      .then((response) => response.json())
      .then((records) => setRecords(records))
      .catch((err) => console.log(err));
  }, []);


 const params= useParams()

  return (
   

    <section className="cat_prod">
  <>
      {records.filter(r =>r.product===params.id).map((posts)=>(
        <Link to={`/category_1/${posts.name}`}>
        <div className="cards">
      <div className="image_box">
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