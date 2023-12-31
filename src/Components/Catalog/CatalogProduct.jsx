import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { imgPrefixURL } from "../Common/ddata";

export const CatalogProduct = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const category = params.categoryId;
  const [searchParams, setSearchParams] = useSearchParams();
  const isSantec = searchParams.get('isSantec');
  const isValtec = searchParams.get('isValtec');

  useEffect(() => {
    ProductService.findByCategoryAndParams(category, isSantec, isValtec).then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <div class="row">
        {products.map((product) => (
          <div className=" col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`product/${product.id}`}>
              <div className="card santehplast-card">
                <img
                  src={`${imgPrefixURL}/${(product.filename ? product.filename : 'santec-bg.png')}`}
                  alt="valtecimg"
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">
                    {product.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
