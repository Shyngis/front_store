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
export const ProdListing = () => {
  const [empdata, empdatachange] = useState();
  const [empdata1, empdatachange1] = useState();

  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/adminpage/prodlisting/proddetail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/adminpage/prodlisting/prodedit/" + id);
  };
  const Removefunction = (item) => {
    {
      fetch(URL + "/product/id/" + item.id, {
        method: "DELETE",
        // headers:{"content-type":"application/json"},
        // body:JSON.stringify(empdata)
      })
        .then((item) => {
          console.log(item.id);
          // alert("Removed Succesfully!")
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    ProductService.getProducts(20)
      .then((resp) => {
        empdatachange(resp.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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

  const [searchParams, setSearchParams] = useSearchParams();
  const isSantec = searchParams.get("isSantec");
  const isValtec = searchParams.get("isValtec");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (subCategoryId !== "") {
      ProductService.findByCategoryAndParams(
        subCategoryId,
        isSantec,
        isValtec
      ).then((product) => {
        setProducts(product);
        console.log(product);
      });
    }
  }, [subCategoryId, setProducts]);

  // useEffect(() => {
  //   fetch(URL + "/category/extended/parent/" + 1).then((response) =>
  //     response.json().then((data) => setCategories(data))
  //   );
  // }, []);

  // useEffect(() => {
  //   fetch(URL + "/category/extended/parent/" + 2).then((response) =>
  //     response.json().then((data) => setSubCategories(data))
  //   );
  // }, []);

  return (
    <>
      <div className="row-mt-3">
        <div className="d-flex col-12">
          <div className="col-lg-6 col-6">
            <h2>Продукты</h2>
            <label htmlFor="cars">Выберите основную категорию:</label>
            <select
              className="category-select"
              // value={mainCategoryId}
              // onChange={(y) => mainCategorySelected(y.target.value)}
              // value={category.id}
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
              // value={mainCategoryId}
              // onChange={(y) => mainCategorySelected(y.target.value)}
              // value={category.id}
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
              <tr className="table-dark table-active">
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
                products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {/* {records
                        .filter((cat) => cat.id === item.category)
                        .map((cat) => cat.name)} */}
                    </td>
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
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Outlet />
    </>
  );
};
