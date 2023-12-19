import React, { useEffect, useState } from 'react';
import CategoryService from '../../services/CategoryService';



export const CategoryByLevelTwo = () => {

  const [name, setNazv_cat] = useState("");
  const [image_cat, setImage_cat] = useState();
  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);

  useEffect(() => {
    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });
  }, []);


  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentId(parentId)
      .then((result) => {
        setFirstLevelCategories(result);
      });
  }


  const saveCategory = (y) => {
    y.preventDefault();
    // console.log('firstLevelCategory', firstLevelCategory);
    // console.log('mainCategory', mainCategory);
    const category = {
      name,
      parent: firstLevelCategory,
      level: 2
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

        <label htmlFor="main">Выберите основную категорию:</label>
        <select className="category-select" value={mainCategory} onChange={getFirstLevelCategoryByParent}>
          {mainCategories.map((category) => (
            <option
              name="option-main"
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="uroven1">Выберите категорию уровень 1:</label>
        <select className="category-select" value={firstLevelCategory} onChange={(y) => setFirstLevelCategory(y.target.value)}>
          {firstLevelCategories.map((category) => (
            <option
              name="option"
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>


        <form onSubmit={saveCategory}>
          <label>Наименование</label>
          <input type="text"
            value={name}
            onChange={(y) => setNazv_cat(y.target.value)}
            required />
          <button className="adding_pr">Добавить</button>
        </form>

        <div className='why'>

        </div>
      </div>
    </>
  )
}