import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProdCreate.css";
import { URL } from "../../Common/ddata";
import CategoryService from "../../services/CategoryService";

export const ProdCreate = () => {
  const { empid } = useParams();
  const [category, setCategoria] = useState();
  const [name, setName_pr] = useState("");
  const [description, setDesc_pr] = useState("");
  const [video, setVideo_pr] = useState("");
  const [isNew, setCheckbox_pr] = useState(false);

  const [productId, setproductId] = useState("");
  const [validation, valchange] = useState(false);

  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    // console.log({id,name,email,phone,active});

    const products = {
      name,
      description,
      // image,
      // artSizeData,
      // file_pr1,

      video,
      isNew,
      category: firstLevelCategory,
      productId,
    };

    fetch(URL + "/product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(products),
    })
      .then((product) => {
        product.json().then((data) => {
          console.log(data, "jsondata");
          setproductId(data.id);
          navigate("/adminpage/prodlisting/prodedit/" + data.id);
        });
        // navigate("/adminpage/prodlisting/prodedit/"+product.id)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [records, setRecords] = useState([]);

  useEffect(() => {
    // fetch(URL + "/category/parent/2")
    //   .then((response) => response.json())
    //   .then((categor) => setRecords(categor))
    //   .catch((err) => console.log(err));

    CategoryService.findByParentId(1).then((result) => {
      setMainCategories(result);
    });
  }, []);

  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentId(parentId).then((result) => {
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
            className="form-select"
            value={mainCategory}
            onChange={getFirstLevelCategoryByParent}
          >
            {mainCategories.map((category) => (
              <option name="option-main" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="uroven1">Выберите под категорию:</label>
          <select
            className="category-select"
            value={firstLevelCategory}
            onChange={getSecondLevelCategoryByParent}
          >
            {firstLevelCategories.map((category) => (
              <option name="option" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <label>Название товара:</label>

        <input
          type="hidden"
          value={productId || ""}
          name="productId"
          onChange={(y) => setproductId(y.target.value)}
        />

        <input
          type="text"
          value={name || ""}
          onChange={(y) => setName_pr(y.target.value)}
          required
        />
        {/* ... (other input fields) */}
        <label>Описание:</label>
        <textarea
          required
          name="description"
          value={description || ""}
          onChange={(y) => setDesc_pr(y.target.value)}
        />

        <div className="checkbox">
          <label>Новинка:</label>
          <input
            type="checkbox"
            checked={isNew || ""}
            onChange={(event) => setCheckbox_pr(event.target.checked)}
          />
        </div>

        <label>Ссылка для видео:</label>
        <input type="url" onChange={(y) => setVideo_pr(y.target.value)} />

        <div className="col-lg-12">
          <div className="submit-buttons">
            <button className="submit-button save-button" type="submit">
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
