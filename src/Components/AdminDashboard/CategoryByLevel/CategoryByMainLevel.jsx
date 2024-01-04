import React, { useEffect, useState } from "react";
import { URL, imgPrefixURL } from "../../Common/ddata";
import { TabButtons } from "../../Category/TabButtons";
import FileService from "../../services/FileService";
import CategoryService from "../../services/CategoryService";
import { ToastContainer, toast } from "react-toastify";

export const CategoryByMainLevel = () => {

  const [name, setName] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: null,
    parent: 1,
    image: null
  });

  const updateName = (name) => {
    setName(name);
    setCategory({ ...category, name });
  }

  const updateImage = (id) => {
    setCategory({ ...category, image: id });
  }

  const saveCategory = () => {
    if (category.id) {
      CategoryService.update(category).then(result => {
        setCategory({ ...category, name: null, image: null });
        setCategoryImage("");
        setName("");
      });
    } else {
      CategoryService.create(category).then(result => {
        setCategories([...categories, result]);
        setCategory({ ...category, name: null, image: null });
        setCategoryImage("");
        setName("");
      });
    }
  }

  useEffect(() => {
    CategoryService.findByParentId(1).then((result) => {
      setCategories(result);
    });

  }, []);

  function uploadCategoryImage(file) {
    FileService.uploadEasy(1, file[0]).then(result => {
      setCategoryImage(result);
      updateImage(result.id);
    });
  }

  const remove = (category) => {
    CategoryService.remove(category.id).then(() => {
      const updatedCategories = []
      categories.forEach(item => {
        if (item.id !== category.id) {
          updatedCategories.push(item);
        }
      });
      setCategories(updatedCategories);
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
    }
  }

  return (
    <>
      <br />
      <div>


        <div className='category'>

          <form>
            <h2>Добавление Категории</h2>
            <label>Наименование</label>
            <input type="text" value={name} onChange={(y) => updateName(y.target.value)} required />
            <label>Выбрать фото </label>
            <input
              type="file"
              onChange={(y) => uploadCategoryImage(y.target.files)}
            />
            <div className="category-image">
              {categoryImage &&
                <img src={`${imgPrefixURL}/${categoryImage.filename}`} ></img>}
            </div>
            <button className="adding_pr" onClick={(e) => { e.preventDefault(); saveCategory(); }}>Cохранить</button>
          </form>

          <div className="why"></div>
        </div>
        <div className="col-md-12">
          <div>
            <table className="table-responsive">
              <thead>
                <tr className="table-dark table-active">
                  <th>#</th>
                  <th>Название</th>
                  <th>
                    <i className="fa fa-tasks"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories &&

                  categories.map((item) => (

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
      </div>
      <ToastContainer />
    </>
  );
};
