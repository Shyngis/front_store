import React, { useEffect, useState } from 'react';
import { URL } from '../../Common/ddata';
import { TabButtons } from '../../Category/TabButtons';
import FileService from '../../services/FileService';

export const CategoryByMainLevel = () => {

  const [name, setNazv_cat] = useState("");
  const [categoryImage, setCategoryImage] = useState();

  const handleSubmit = (y) => {
    y.preventDefault();
    const category = {
      name,
      parent: 1,
      image: categoryImage
    };

    fetch(URL + "/category", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(category),
    })
      .then((data) => { return data.json() })
      .then((result) => {
        alert(result)
      });

  }

  function uploadCategoryImage(file) {
    FileService.uploadEasy(1, file[0]).then(result => {
      setCategoryImage(result.id);
    });
  }

  return (
    <>
      <br />
      <div className='category'>

        <form onSubmit={handleSubmit}>
          <h2>Добавление Категории</h2>
          <label>Наименование</label>
          <input type="text" value={name} onChange={(y) => setNazv_cat(y.target.value)} required />
          <label>Выбрать фото </label>
          <input type="file" onChange={(y) => uploadCategoryImage(y.target.files)}
          />
          <button className="adding_pr">Cохранить</button>
        </form>

        <div className='why'>

        </div>
      </div>
    </>
  )
}