import React, { useEffect, useState } from "react";
import { URL, imgPrefixURL } from "../../Common/ddata";
import { TabButtons } from "../../Category/TabButtons";
import FileService from "../../services/FileService";
import CategoryService from "../../services/CategoryService";
import { ToastContainer, toast } from "react-toastify";

export const CategoryByMainLevel = () => {
  const [name, setNazv_cat] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [categories, setCategories] = useState([]);

  const handleSubmit = (y) => {
    y.preventDefault();

    const category = {
      name,
      parent: 1,
      image: categoryImage,
    };
    CategoryService.create(category).then((result) => {
      toast.success("Успешно добавлено !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  useEffect(() => {
    CategoryService.findByParentId(1).then((result) => {
      setCategories(result);
    });
  }, []);

  function uploadCategoryImage(file) {
    FileService.uploadEasy(1, file[0]).then((result) => {
      setCategoryImage(result.id);
    });
  }

  const remove = (category) => {
    console.log("remove categoryes", category);
    CategoryService.remove(category.id).then(() => {
      const updatedCategories = [];
      categories.forEach((item) => {
        if (item.id !== category.id) {
          updatedCategories.push(item);
        }
      });
      setCategories(updatedCategories);
    });
  };

  const editStart = (category) => {};

  return (
    <>
      <br />
      <div>
        <div className="category">
          <form onSubmit={handleSubmit}>
            <h2>Добавление Категории</h2>
            <label>Наименование</label>
            <input
              type="text"
              value={name}
              onChange={(y) => setNazv_cat(y.target.value)}
              required
            />
            <label>Выбрать фото </label>
            <input
              type="file"
              onChange={(y) => uploadCategoryImage(y.target.files)}
            />
            <div className="category-image">
              <img src={``}></img>
            </div>
            <button className="adding_pr">Cохранить</button>
          </form>

          <div className="why"></div>
        </div>
        <div className="col-md-12">
          {/* <div className="divbtn">
          <h2>Продукты</h2>
          <Link to="prodcreate" className="btn btn-success">
            Добавить продукт <i class="fa fa-add"></i>
          </Link>
        </div> */}
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
                  categories.map(
                    (item) =>
                      item.isRemoved == false && (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            {/* <a
        onClick={() => {
        LoadEdit(item.id);
      }}
        className="btn btn-success"
        >
        <i class ="fa fa-edit"></i>
        </a>
        */}

                            <a
                              className="btn btn-danger"
                              onClick={() => remove(item)}
                            >
                              <i class="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
