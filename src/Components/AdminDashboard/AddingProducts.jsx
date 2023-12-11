import React, { useEffect, useState } from "react";
import "./AddingProducts.css";
import { AdminpageHeader } from "./AdminpageHeader";
import { URL } from "../Common/ddata";
const AddingProducts = () => {

  
  const [artSizeData, setArtSizeData] = useState([]);
  const [name, setName_pr] = useState("");
  const [description, setDesc_pr] = useState("");
  const [image, setPhoto_pr] = useState();
  const [file_pr, setFiles_pr] = useState();
  const [video_pr, setVideo_pr] = useState("");
  const [checkbox_pr, setCheckbox_pr] = useState("");

  const [files, setFiles] = useState();
  const [productId, setproductId] = useState();

  const handleOzgert = (y) => {
    setFiles(y.target.files);
    // setPhoto_pr(y.target.value);
    // setPhoto_pr(y.target.image);
  }


  function handleUpload() {
    for (let i = 0; i < files.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId)
      container1.append(`file`, files[i])
      Send(container1);
      console.log('container1',container1);
    }   
  }


  function Send(data) {
    fetch(URL + '/upload/image', {
      method: 'POST',
      // headers: { "Content-type": "multipart/form-data" },
      body: data
    }).then(res => res.json()).
      then(data => console.log(data)).
      catch(err => console.log(err));
  }
  const handleAdd = () => {
    setArtSizeData([...artSizeData, { data_art: "", size_art: "" }]);
  };



  const handleChange = (i, field, value) => {
    const updatedData = [...artSizeData];
    updatedData[i][field] = value;
    setArtSizeData(updatedData);

  };

  const handleDelete = (i) => {
    const updatedData = [...artSizeData];
    updatedData.splice(i, 1);
    setArtSizeData(updatedData);
  };



  const handleSubmit = (y) => {
    y.preventDefault();

    const products = {
      name,
      description,
      image,
      // artSizeData,
      // file_pr,
      files,
      video_pr,
      checkbox_pr,
      category,
      productId,
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
        console.log('container.id==product.id==', product.id);
        setproductId(product.id);
        alert("New product added");
      })
  };

  const [records, setRecords] = useState([]);
  const [category, setCategoria] = useState([]);

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
          <label>Название товара:</label>

          <input
            type="hidden"
            value={productId}
            name="productId"
            onChange={(y) => setproductId(y.target.value)}
            
          />

          <input
            type="text"
            value={name}
            onChange={(y) => setName_pr(y.target.value)}
            required
          />
          {/* ... (other input fields) */}
          <label>Описание:</label>
          <textarea
            required
            name="description"
            value={description}
            onChange={(y) => setDesc_pr(y.target.value)}
          />

          {/* ... (other input fields) */}

          

          <label>Ссылка для видео:</label>
          <input type="url" onChange={(y) => setVideo_pr(y.target.value)} />

          <form className="checkbox">
            <label>Новинка:</label>
            <input
              type="checkbox"
              onChange={(y) => setCheckbox_pr(y.target.value)}
            />
          </form>
          <form>
            <label for="cars">Выберите категорию:</label>
             
            <select  value={category} onChange={(y)=>setCategoria(y.target.value)}>
                        {records.map((categor)=>(         
              <option 
              
              name="option"
              // key={categor.id} 
              value={categor.id}>
              {categor.name} 
              </option>
              
              ))}  
              </select>

          </form>
          <button className="adding_pr">Добавить товар</button>
        </form>

        <div className="article_size">
            <label>Артикул и размер</label>
            <button type="button" className="adding_pr" onClick={handleAdd}>
              Добавить
            </button>
          </div>

          {artSizeData.map((data, i) => (
            <div key={i}>
              <label>Артикул товара</label>
              <input
                type="text"
                value={data.data_art}
                onChange={(e) => handleChange(i, "data_art", e.target.value)}
                required
              />

              <label>Размер товара</label>
              <input
                type="number"
                value={data.size_art}
                onChange={(e) => handleChange(i, "size_art", e.target.value)}
                required
              />

              <button type="button" onClick={() => handleDelete(i)}>
                Удалить
              </button>
            </div>
          ))}
        <label>Загрузить фото:</label>
          <input
            type="file"
            name="file"
            multiple
            value={image}
            onChange={handleOzgert}
          />
              <label>Загрузить файлы:</label>
          <input
            type="file"
            onChange={(y) => setFiles_pr(y.target.value)}
            multiple
            accept="*/*"
          />

          <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );

};

export default AddingProducts;






//           </option>

//           </select>

 
  //   {categor.nazv}
