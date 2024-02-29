import React, { useEffect, useState } from "react";
import "./CatalogProducts.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { DOMAIN, imgPrefixURL } from "../Common/ddata";
import { images } from '../../Assets/brand/images';


export const CatalogProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const params = useParams();
  const category = params.categoryId;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    ProductService.findByCategoryAndParams(category).then((result) => {
      if(result.products) {
        setProducts(result.products);
      }
      setFilteredProducts(result.products);
      if(result.brands) {
        setBrands(result.brands.reverse());
      }
    });
  }, []);


  const onBrandSelect = (brand) => {
    const filteredProducts = products.filter(item => item.brand === brand.code);
    setFilteredProducts(filteredProducts);
  };

  const handleHover = (index) => {
    const image = document.querySelectorAll('.brand-image')[index];
    image.classList.add('hover-animation');
  };
  
  const handleHoverLeave = (index) => {
    const image = document.querySelectorAll('.brand-image')[index];
    image.classList.remove('hover-animation');
  };
  return (
    <>
      <div class="row mt-4">
        
        <div className="brands-container">
        {/* <label>Фильтр:</label> */}
          {brands.map((brand, index) => (
            <label key={index} htmlFor={brand.id} className="filter-label">
              <input
                type="radio"
                id={brand.id}
                name="brand"
                value={brand.id}
                onChange={() => onBrandSelect(brand)}
              />&nbsp;&nbsp;
              <img
                src={images[brand.code]}
                alt={brand.name}
                className={`brand-image ${brand.code}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHoverLeave(index)}
              />
            </label>
          ))}
        </div>

        {filteredProducts.map((product) => (
          <div className="mt-4 col-6 col-sm-4 col-md-3 col-lg-2">
            <Link to={`product/${product.id}`}>
              <div className={`${product.isNew ? 'image-container' : ''} card santehplast-card`}>
                <div className="product-image">
                  <img
                    src={images[product.brand]}
                    className="product-brand"
                  />
                  <img
                    src={`${imgPrefixURL}/${(product.filename ? product.filename : 'santec-bg.png')}`}
                    className="card-image-class"
                  />
                </div>
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
