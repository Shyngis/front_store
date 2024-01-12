import React, { useEffect, useState } from "react";
import { URL, imgPrefixURL } from "../../Common/ddata";
import { TabButtons } from "../../Category/TabButtons";
import FileService from "../../services/FileService";
import CategoryService from "../../services/CategoryService";
import { ToastContainer, toast } from "react-toastify";

export const MainCategory = () => {

  const [name, setName] = useState("");
  const [isSantec, setIsSantec] = useState(false);
  const [isValtec, setIsValtec] = useState(false);

  const [categoryImage, setCategoryImage] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: null,
    parent: 1,
    image: null,
    isValtec,
    isSantec
  });

  const updateName = (name) => {
    setName(name);
    setCategory({ ...category, name });
  }

  const updateImage = (id) => {
    setCategory({ ...category, image: id });
  }

  const saveCategory = () => {
    category.isSantec = isSantec;
    category.isValtec = isValtec;
    if (category.id) {
      CategoryService.update(category).then(result => {
        setCategory({ ...category, name: null, image: null });
        setCategoryImage("");
        setName("");
        setIsValtec(false);
        setIsSantec(false);
        const updatedCategories = [];
        categories.forEach(item => {
          if (item.id === result.id) {
            item.name = result.name;
            item.isValtec = result.isValtec;
            item.isSantec = result.isSantec;
            item.image =result.image;
          }
          updatedCategories.push(item);
        });
        setCategories(updatedCategories);
      });
    } else {

      CategoryService.create(category).then(result => {
        setCategories([...categories, result]);
        setCategory({ ...category, name: null, image: null });
        setCategoryImage("");
        setName("");
        setIsValtec(false);
        setIsSantec(false);
      });
    }
  }

  useEffect(() => {
    CategoryService.findByParentIdPrivate(1).then((result) => {
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
    setIsSantec(editedCategory.isSantec);
    setIsValtec(editedCategory.isValtec);
    setCategory({
      ...category,
      id: editedCategory.id,
      name: editedCategory.name,
      isRemoved: editedCategory.isRemoved,
      parent: editedCategory.parent,
      image: editedCategory.image,
      isSantec: editedCategory.isSantec,
      isValtec: editedCategory.isValtec
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
      <div class="row">

        <form>
          <div className="col-md-12 category">
            <h2>Добавление Категории</h2>
            <div className="form-group">
              <label className="form-label"> Наименование </label>
              <input className="form-input" type="text" value={name} onChange={(y) => updateName(y.target.value)} required />
            </div>
          </div>

          <div class="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-check-label"> Категория для Santec </label>
                <input className="form-check-control" checked={isSantec} onChange={(e) => setIsSantec(e.target.checked)} type="checkbox" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-check-label"> Категория для Valtec </label>
                <input className="form-check-control" checked={isValtec} onChange={(e) => setIsValtec(e.target.checked)} type="checkbox" />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <label className="form-label">Выбрать фото </label>
            <input className="form-control" type="file" onChange={(y) => uploadCategoryImage(y.target.files)} />
            <div className="category-image mb-3">
              {categoryImage &&
                <img src={`${imgPrefixURL}/${categoryImage.filename}`} ></img>}
            </div>

            <button className="btn btn-outline-success" onClick={(e) => { e.preventDefault(); saveCategory(); }}>Cохранить</button>
          </div>
        </form>

        <div className="row">
          <div className="col-md-12"><hr /></div>
        </div>


        <div className="col-md-12">
          <div>
            <table className="table-responsive">
              <thead>
                <tr>
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
