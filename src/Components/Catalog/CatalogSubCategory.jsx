import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import "./Catalog.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CategoryService from "../services/CategoryService";
import { imgPrefixURL } from "../Common/ddata";

export const CatalogSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSantec = searchParams.get('isSantec');
  const isValtec = searchParams.get('isValtec');

  useEffect(() => {
    CategoryService.findByParentAndImageId(params.id).then(result => {
      setCategories(result);
    });
  }, []);

  return (
    <>
      <div>
        <div className="row mt-4">
          {categories.map((item) => (

            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
              <Link to={`products/${item.category.id}`}>
                <div className="card santehplast-card">
                  <img
                      src={`${imgPrefixURL}/${(item.image.filename ? item.image.filename : 'santec-bg.png')}`}
                      alt="no-image"
                      className="card-img-top"
                    />

                  <div className="card-body">
                    <p
                      className="card-text"
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
