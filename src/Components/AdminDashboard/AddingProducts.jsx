import React, { useEffect, useState } from "react";
import "./AddingProducts.css";
import { URL } from "../Common/ddata";
import { AddingprDisplay } from "./AddingprDisplay";
// import { ProdCreate2 } from "./AddprodCrud/ProdCreate2";

const AddingProducts = () => {
  const [name, setName_pr] = useState("");
  const [description, setDesc_pr] = useState("");
  const [video, setVideo_pr] = useState("");
  const [isNew, setCheckbox_pr] = useState(false);
  const [artSizeData, setArtSizeData] = useState([]);

  const [image, setPhoto_pr] = useState();
  const [files, setFiles] = useState();
  const [containerId, setproductId] = useState();

  const [article, setArticle] = useState("");
  const [size, setSize] = useState("");

  const handleOzgert = (y) => {
    setFiles(y.target.files);
    // setPhoto_pr(y.target.value);
    // setPhoto_pr(y.target.image);
  };

  function handleUpload() {
    for (let i = 0; i < files.length; i++) {
      const container1 = new FormData();
      container1.append("container", containerId);
      container1.append(`file`, files[i]);
      Send(container1);
      console.log("container1", container1);
    }
  }
  function Send(data) {
    fetch(URL + "/upload/image", {
      method: "POST",
      // headers: { "Content-type": "multipart/form-data" },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const handleSubmit = (y) => {
    y.preventDefault();

    const products = {
      name,
      description,
      // image,
      // artSizeData,
      // file_pr1,
      files,
      video,
      isNew,
      category,
      // container,
    };
    // ... (other form data)

    fetch(URL + "/product", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(products),
    })
      .then(function (response) {
        return response.json();
      })
      // .then(function (data) {
      //   console.log('container.id==product.id==',);
      //   setContainerId(data);
      //   alert("New product added");
      // })
      .then((product) => {
        console.log("container.id==product.id==", product.id);
        setproductId(product.id);
        alert("New product added");
      });
  };

  const [productArticleAndSize, setProductArticleAndSize] = useState([]);
  const handleSubmit1 = (y) => {
    y.preventDefault();

    // const firstArtSizeData = artSizeData[0] ||   {} ;

    const productsi = {
      //  article: firstArtSizeData.article || "", // Use the article from the first element or an empty string
      // size: firstArtSizeData.size || "",
      article,
      size,
    };
    // ... (other form data)

    fetch(URL + "/product/size", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productsi),
    })
      .then(function (response) {
        return response.json();
      })
      .then((product) => {
        setproductId(product.id);
        setProductArticleAndSize([
          ...productArticleAndSize,
          <div className="indent" key={product.id}>
            {product.article} - {product.size}
          </div>,
        ]);

        alert("Added succesfully!");
      });

    const rowsss = [];
    for (let i = 0; i < 10; i++) {
      // rowsss.push(<h1 key={i}></h1>);
    }
    console.log("rows", rowsss);

    // var rowsss = [];
  };

  const [records, setRecords] = useState([]);
  const [category, setCategoria] = useState();

  useEffect(() => {
    fetch(URL + "/category/parent/2")
      .then((response) => response.json())
      .then((categor) => setRecords(categor))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="create">
        <h2>Добавление товара</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cars">Выберите категорию:</label>

            <select
              value={category}
              onChange={(y) => setCategoria(y.target.value)}
            >
              {records.map((categor) => (
                <option name="option" key={categor.id} value={categor.id || ""}>
                  {categor.name}
                </option>
              ))}
            </select>
          </div>

          <label>Название товара:</label>

          <input
            type="hidden"
            value={containerId || ""}
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

          <button className="adding_pr">Добавить товар</button>
        </form>

        <hr />
        {productArticleAndSize}

        <div className="article_size">
          <label>Артикул и размер</label>
        </div>

        <div>
          <label>Артикул товара</label>
          <input
            type="text"
            value={article || ""}
            onChange={(y) => setArticle(y.target.value)}
            required
          />

          <label>Размер товара</label>
          <input
            type="number"
            value={size || ""}
            onChange={(y) => setSize(y.target.value)}
            required
          />
        </div>

        <button onClick={handleSubmit1}>Upload1art</button>

        <label>Загрузить фото:</label>
        <input
          type="file"
          name="file"
          multiple
          // value={files}
          onChange={handleOzgert}
        />
        <label>Загрузить файлы:</label>
        <input
          type="file"
          name="file"
          multiple
          // value={files}
          // onChange={handleOzgert}
        />

        <button onClick={handleUpload}>Upload</button>

        <AddingprDisplay />
      </div>
    </>
  );
};

export default AddingProducts;
