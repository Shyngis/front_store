import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "./ProdListing.css";
import ReactPlayer from "react-player";
import { URL } from "../../Common/ddata";

export const ProdListing = () => {
  const [empdata, empdatachange] = useState();

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
    fetch(URL + "/product/page?size=20")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(URL + "/category/parent/2")
      .then((response) => response.json())
      .then((categor) => setRecords(categor))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="card">
        <h2>Продукты</h2>
      </div>
      <div className="divbtn">
        <Link to="prodcreate" className="btn btn-success">
          Добавить новый продукт (+)
        </Link>
      </div>
      <div className="container">
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
            {empdata &&
              empdata.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {records
                      .filter((cat) => cat.id === item.category)
                      .map((cat) => cat.name)}
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
                      Редакт.
                    </a>
                    <a
                      onClick={() => {
                        Removefunction(item);
                      }}
                      className="btn btn-danger"
                    >
                      Удалить
                    </a>
                    <a
                      onClick={() => {
                        LoadDetail(item.id);
                      }}
                      className="btn btn-primary"
                    >
                      Подр.
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Outlet />
    </>
  );
};
