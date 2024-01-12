import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProdCreate.css";
import { URL } from "../../Common/ddata";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";

export const ProdCreate = () => {
  const { empid } = useParams();
  const [category, setCategoria] = useState();
  const [name, setName_pr] = useState("");
  const [description, setDesc_pr] = useState("");
  const [video, setVideo_pr] = useState("");
  const [isNew, setCheckbox_pr] = useState(false);
  const [isSantec, setIsSantec] = useState(false);

  const [productId, setproductId] = useState("");

  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      video,
      isNew,
      category: firstLevelCategory,
      productId,
      isSantec
    };


    ProductService.create(product)
    .then((data) => {
      setproductId(data.id);
      navigate("/adminpage/prodlisting/prodedit/" + data.id);
    })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  useEffect(() => {
    CategoryService.findByParentIdPrivate(1).then((result) => {
      setMainCategories(result);
    });
  }, []);

  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentIdPrivate(parentId).then((result) => {
      setFirstLevelCategories(result);
    });
  };

  const getSecondLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setFirstLevelCategory(parentId);
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handlesubmit}>
        <div>
          <label htmlFor="main">Выберите основную категорию:</label>
          <select
            required
            className="form-select"
            value={mainCategory}
            onChange={getFirstLevelCategoryByParent}
          >
            <option name="option" value="">--</option>
            {mainCategories.map((category) => (
              <option name="option-main" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="uroven1">Выберите под категорию:</label>
          <select
            required
            className="form-select"
            value={firstLevelCategory}
            onChange={getSecondLevelCategoryByParent}
          >
            <option name="option" value="">--</option>
            {firstLevelCategories.map((category) => (
              <option name="option" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>



        <input
          type="hidden"
          value={productId || ""}
          name="productId"
          onChange={(y) => setproductId(y.target.value)}
        />

        <div class="mb-3">
          <label className="form-label">Название товара:</label>
          <input
            className="form-control"
            type="text"
            value={name || ""}
            onChange={(y) => setName_pr(y.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label className="form-label">Описание:</label>
          <textarea
            className="form-control"
            required
            name="description"
            value={description || ""}
            onChange={(y) => setDesc_pr(y.target.value)}
          />
        </div>

        <div class="mb-3">
          <div className="checkbox">
            <label className="form-check-label">Новинка:</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={isNew || ""}
              onChange={(event) => setCheckbox_pr(event.target.checked)}
            />
          </div>
        </div>

        <div class="mb-3">
          <div className="checkbox">
            <label className="form-check-label">Продукция SANTEC:</label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={isSantec || ""}
              onChange={(event) => setIsSantec(event.target.checked)}
            />
          </div>
        </div>

        <div class="mb-3">
          <label className="form-label">Ссылка для видео:</label>
          <input className="form-control" type="url" onChange={(y) => setVideo_pr(y.target.value)} />
        </div>

        <div className="col-lg-12">
          <div className="submit-buttons">
            <button className="btn btn-outline-success" type="submit">
              Сохранить
            </button>
            <Link
              to="/adminpage/prodlisting"
              className="submit-button back-button"
            >
              Назад
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
