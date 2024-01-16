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
  const [isSantec, setIsSantec] = useState(false);
  const [isValtec, setIsValtec] = useState(false);



  useEffect(() => {

    CategoryService.findByParentIdPrivate(1)
      .then((result) => {
        setMainCategories(result);
      });

  }, []);

  const saveCategory = (y) => {

    y.preventDefault();
    
    category.parent = mainCategoryId;
    category.isSantec = isSantec;
    category.isValtec = isValtec;

    if (category.id) {
      CategoryService.update(category)
        .then((result) => {
          updateCategory(result);
          setIsValtec(false);
          setIsSantec(false);
          setCategoryName("");
          toast.success("Успешно обновлено !", { autoClose: 1000 });
        });
    } else {
      CategoryService.create(category)
        .then((result) => {
          setSubCategories([...subCategories, result]);
          setCategoryName("");
          setIsValtec(false);
          setIsSantec(false);
          toast.success("Успешно сохранено !", { autoClose: 1000 });
        });
    }
  }

  const mainCategorySelected = (categoryId) => {
    setMainCategoryId(categoryId);
    CategoryService.findByParentIdPrivate(categoryId).then(result => {
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
        item.isValtec = updatedCategory.isValtec;
        item.isSantec = updatedCategory.isSantec;
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
      <div className='row'>
        <div className='col-md-12'>

          <form onSubmit={saveCategory}>
            <h2>Добавление подкатегории</h2>

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

            <div className="col-md-12">
              <label className="form-label">Наименование</label>
              <input className="form-control" type="text" value={name} onChange={(y) => setCategoryName(y.target.value)} required />
            </div>

            {/* <div class="row">
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
            </div> */}

            <div className="col-md-12">
              <label className="form-label">Загрузить фото </label>
              <input className="form-control" type="file" onChange={(y) => uploadCategoryImage(y.target.files)}></input>
              <div className="category-image mb-3">
                {categoryImage &&
                  <img src={`${imgPrefixURL}/${categoryImage.filename}`} ></img>}
              </div>

              <button className="btn btn-outline-success">Сохранить</button>
            </div>

          </form>


          <div className="col-md-12">
            <div>
              <table className="table-responsive">
                <thead>
                  <tr>
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
      </div>


    </>
  )
}