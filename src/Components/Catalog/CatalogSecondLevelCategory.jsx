import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams } from "react-router-dom";
import CategoryService from "../services/CategoryService";




export const CatalogSecondLevelCategory = () => {
  
  const [records, setRecords] = useState([]);
  const params = useParams();

  useEffect(() => {
    CategoryService.findByParentId(params.secondLevelId).then(result => {
      setRecords(result)
    });
  }, []);


  return (


    <section className="cat_prod">
      <>
        {records.map((record) => (
          <Link to={ `second-level/${record.name}`}>
            <div className="cards">
              <div className="image_box">
                <img src={record.image} alt="" />
              </div>
              <div className="details">
                <p>{record.name}</p>
                <p>{record.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    </section>
  );
};

