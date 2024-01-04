import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FileService from '../../services/FileService';
import { URL, imgPrefixURL } from '../../Common/ddata';


export const SubCategory = () => {

  const [name, setName] = useState("");
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState();
  const [category, setCategory] = useState({});



  useEffect(() => {

    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });

  }, []);

  const saveCategory = (y) => {

    y.preventDefault();
    category.parent =  mainCategoryId;

    if (category.id) {
      CategoryService.update(category)
        .then((result) => {
          updateCategory(result);
          toast.success("Успешно обновлено !", { autoClose: 1000 });
        });
    } else {
      CategoryService.create(category)
        .then((result) => {
          setSubCategories([...subCategories, result]);
          setCategoryName("");
          toast.success("Успешно сохранено !", { autoClose: 1000 });
        });
    }
  }

  const mainCategorySelected = (categoryId) => {
    setMainCategoryId(categoryId);
    CategoryService.findByParentId(categoryId).then(result => {
      setSubCategories(result);
    });
  };


  const setCategoryName = (name) => {
    setName(name);
    setCategory({
      ...category, name: name
    })
  };

  const remove = (category) => {
    CategoryService.remove(category.id).then(() => {
      const updatedCategories = []
      subCategories.forEach(item => {
        if (item.id !== category.id) {
          updatedCategories.push(item);
        }
      })
      setSubCategories(updatedCategories);
    });
  };

  const editStart = (editedCategory) => {

    setName(editedCategory.name);
    setCategory({
      ...category,
      id: editedCategory.id,
      name: editedCategory.name,
      isRemoved: editedCategory.isRemoved,
      parent: editedCategory.parent,
      image: editedCategory.image,
    });

    if (editedCategory.image) {
      FileService.findById(editedCategory.image).then(result => {
        setCategoryImage(result);
      });
    } else {
      setCategoryImage("");
    }
  }
  const updateImage = (id) => {
    setCategory({ ...category, image: id });
  }

  function updateCategory(updatedCategory) {
    const updatedCategories = [];
    subCategories.forEach(item => {
      if (item.id === updatedCategory.id) {
        item.name = updatedCategory.name;
        item.isRemoved = updatedCategory.isRemoved;
        item.image = updatedCategory.image;
      }
      updatedCategories.push(item);
    })
    setSubCategories(updatedCategories);
  }

  function uploadCategoryImage(file) {
    FileService.uploadEasy(1, file[0]).then(result => {
      setCategoryImage(result);
      updateImage(result.id);
    });
  }



  return (
    <>
      <br />
      <div className='category'>
        <form onSubmit={saveCategory}>

          <label htmlFor="cars">Выберите основную категорию:</label>
          <select className="category-select" value={mainCategoryId} onChange={(y) => mainCategorySelected(y.target.value)}>
            <option value="">--</option>
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
            onChange={(y) => setCategoryName(y.target.value)}
            required />

          <label>Загрузить фото </label>
          <input type="file" onChange={(y) => uploadCategoryImage(y.target.files)}></input>
          <div className="category-image">
            {categoryImage &&
              <img src={`${imgPrefixURL}/${categoryImage.filename}`} ></img>}
          </div>

          <button className="adding_pr">Сохранить</button>
        </form>


        <div className="col-md-12">
          <div>
            <table className="table-responsive">
              <thead>
                <tr className="table-dark table-active">
                  <th>#</th>
                  <th>Название</th>
                  <th><i className="fa fa-tasks"></i></th>
                </tr>
              </thead>
              <tbody>
                {subCategories &&
                  subCategories.map((item) => (

                    item.isRemoved == false &&
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <a className="btn btn-success" onClick={() => editStart(item)}><i className="fa fa-edit"></i></a>
                        <a className="btn btn-danger" onClick={() => remove(item)} ><i className="fa fa-trash"></i></a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>


    </>
  )
}