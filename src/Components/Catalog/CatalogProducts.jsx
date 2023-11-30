import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import {records} from '../Common/ddata'

export const CatalogProducts = () => {
  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/posts")
  //     .then((response) => response.json())
  //     .then((posts) => setRecords(posts))
  //     .catch((err) => console.log(err));
  // }, []);



  return (
    <section className="cat_prod">
  
      {records.map((posts)=>(
        <div className="cards">
      <div className="image_box">
        <img src={posts.image} alt="" />
      </div>
      <div className="details">
        <p>{posts.name}</p>
        <p>{posts.description}</p>
      </div>
    </div>
  ))}
 
    </section>
  );
};