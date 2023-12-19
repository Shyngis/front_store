import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';



export const CategoryByLevelOne = () => {

  const [name, setName] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [image_cat, setImage_cat] = useState();
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {

    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });

  }, []);

  const saveCategory = (y) => {
    y.preventDefault();
    const category = {
      name,
      parent: mainCategory,
      level: 1
    };
    CategoryService.create(category)
      .then((result) => {
        alert(result)
      });
  }



  return (
    <>
      <br />
      <div className='category'>
        <form onSubmit={saveCategory}>

          <label htmlFor="cars">Выберите основную категорию:</label>
          <select className="category-select" value={mainCategory} onChange={(y) => setMainCategory(y.target.value)}>
            {mainCategories.map((category) => (
              <option
                name="option"
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* <h2>Добавление Категории</h2> */}
          <label>Наименование</label>
          <input type="text"
            value={name}
            onChange={(y) => setName(y.target.value)}
            required />
          {/* <label>Загрузить фото </label> */}
          {/* <input type="file"
            value={image_cat}
            multiple
            onChange={(y) => setImage_cat(y.target.value)}
          /> */}
          <button className="adding_pr">Добавить</button>
        </form>
      </div>
    </>
  )
}