import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./ProdListing.css";
import ReactPlayer from "react-player";
import { URL } from "../../Common/ddata";
import ProductService from "../../services/ProductService";
import CategoryService from "../../services/CategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProdListing = () => {
  // const [products, empdatachange] = useState([]);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/adminpage/prodlisting/proddetail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/adminpage/prodlisting/prodedit/" + id);
  };

  const Removefunction = (item) => {
    {
      ProductService.remove(item.id)
        .then(() => {
          const newProducts = products.map((productItem) => {
            if (productItem.id === item.id) {
              return { ...productItem, isRemoved: true };
            }
            return productItem;
          });
          setProducts(newProducts);

          toast.success("Успешно удалено !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Ошибка при удалении !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const [mainCategories, setMainCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  useEffect(() => {
    CategoryService.findByParentIdPrivate(1).then((result) => {
      setMainCategories(result);
    });
  }, []);

  useEffect(() => {
    if (mainCategoryId !== "") {
      CategoryService.findByParentIdPrivate(mainCategoryId).then((result) => {
        setSubCategories(result);
      });
    }
  }, [mainCategoryId]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (subCategoryId !== "") {
      ProductService.findByPrivateCategoryAndParams(subCategoryId).then(
        (products) => {
          console.log(products);
          setProducts(products);
        }
      );
    }
  }, [subCategoryId, setProducts]);

  return (
    <>
      <div className="row-mt-3">
        <div className="d-flex col-12">
          <div className="col-lg-6 col-6">
            <h2>Продукты</h2>
            <label htmlFor="cars">Выберите основную категорию:</label>
            <select
              className="category-select"
              onChange={(e) => setMainCategoryId(e.target.value)}
            >
              <option value="">--</option>
              {mainCategories.map((category) => (
                <option name="option" key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="cars">Выберите под категорию:</label>
            <select
              className="category-select"
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option value="">--</option>
              {subcategories.map((category) => (
                <option name="option" key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="dov_prod col-6 col-lg-6">
            <Link to="prodcreate" className="btn btn-success">
              Добавить продукт <i className="fa fa-add"></i>
            </Link>
          </div>
        </div>

        <div>
          <table className="table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Категория</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Новинка</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(
                  (item) =>
                    !item.isRemoved && (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.isNew ? "ДА" : "НЕТ"}</td>
                        <td>
                          <a
                            onClick={() => {
                              LoadEdit(item.id);
                            }}
                            className="btn btn-success"
                          >
                            {/* Редакт. */}
                            <i className="fa fa-edit"></i>
                          </a>
                          <a
                            onClick={() => {
                              Removefunction(item);
                            }}
                            className="btn btn-danger"
                          >
                            {/* Удалить */}
                            <i className="fa fa-trash"></i>
                          </a>
                          <a
                            onClick={() => {
                              LoadDetail(item.id);
                            }}
                            className="btn btn-primary"
                          >
                            {/* Подр. */}
                            <i className="fa fa-eye"></i>
                          </a>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </div>

      <Outlet />
    </>
  );
};
