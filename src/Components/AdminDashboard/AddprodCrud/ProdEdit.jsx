import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL, imgPrefixURL } from "../../Common/ddata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/CategoryService";
import ReactPlayer from "react-player";

export const ProdEdit = () => {
  const { empid } = useParams();
  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);
  // const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(URL + "/product/id/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        setFirstLevelCategory(resp.category);
        namechange(resp.name);
        descriptionchange(resp.description);
        isNewchange(resp.isNew);
        setVideo_pr(resp.video);
        setproduct(resp.id);

        if (resp.category) {
          CategoryService.findLevelCategoriesById(resp.category).then(
            (result) => {
              if (result) {
                console.log("result in resp.category", result, resp.category);
                if (resp.category) {
                  setFirstLevelCategory(resp.category);
                }
                setFirstLevelCategories(result);

                const firstItem = result[0];
                setMainCategory(firstItem.parent);
              }
            }
          );
        }

        setproductId(resp.id);
        fetch(URL + "/upload/image/" + resp.id)
          .then((response) => response.json())
          .then((data) => {
            setImgRealDisplay(data);
            console.log(data);
          });

        fetch(
          URL +
            "/upload/file/container/" +
            resp.id +
            "/container-class/Document"
        )
          .then((response) => response.json())
          .then((data) => {
            setFileRealDisplay(data);
            console.log(data);
          })
          .catch((err) => console.log(err));

        console.log("Product doesn accesable fetched from server ");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [description, descriptionchange] = useState("");
  const [isNew, isNewchange] = useState(true);
  const [video, setVideo_pr] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const saveProduct = (e) => {
    e.preventDefault();
    const empdata = {
      id,
      name,
      category: firstLevelCategory,
      description,
      isNew,
      video,
    };

    fetch(URL + "/product", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        toast.success("Успешно сохранено !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [article, setArticle] = useState("");
  const [size, setSize] = useState("");
  const [productId, setproductId] = useState();
  const [product, setproduct] = useState();

  const [productArticleAndSize, setProductArticleAndSize] = useState([]);

  const handleSubmit1 = (y) => {
    y.preventDefault();
    toast.success("Успешно добавлено !", {
      position: toast.POSITION.TOP_RIGHT,
    });

    const productsi = {
      article,
      size,
      product,
    };

    fetch(URL + "/product/size", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productsi),
    })
      .then(function (response) {
        return response.json();
      })
      .then((product) => {
        // setproductId(product.id);
        setProductArticleAndSize([...productArticleAndSize, product]);
      });
  };

  // const[productsize,setProductsize] = useState([])

  useEffect(() => {
    fetch(URL + "/product/size/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        //  setProductsize(resp);
        setProductArticleAndSize(resp);
        console.log("seen");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const LoadEdit = (id) => {
    navigate("/adminpage/prodlisting/prodedit/" + empid + "/" + id);
    console.log("loadedit");
  };

  const removeArticleAndSize = (id) => {
    const newProductArticleAndSize = productArticleAndSize.map((paz) => {
      if (paz === id) {
        return { ...paz, isRemoved: true };
      }
      return paz;
    });

    setProductArticleAndSize(newProductArticleAndSize);
  };
  const Removefunction = (product) => {
    fetch(URL + "/product/size/" + product.id, {
      method: "DELETE",
      // headers:{"content-type":"application/json"},
      // body:JSON.stringify(empdata)
    })
      .then((res) => {
        product.isRemoved = true;
        removeArticleAndSize(product.id);
        console.log(productArticleAndSize);
        toast.error("Успешно удалено !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [files, setFiles] = useState();

  const handleImage = (y) => {
    setFiles(y.target.files);
  };
  const [imgRealDisplay, setImgRealDisplay] = useState([]);
  const [imageDisplay, setimageDisplay] = useState([]);

  async function handleUpload() {
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId);
      container1.append(`file`, files[i]);
      const sendImage = await Send(container1);
      const sendImageResponse = await sendImage.json();
      images.push(sendImageResponse);
    }
    setimageDisplay(images);
  }

  function Send(data) {
    return fetch(URL + "/upload/image", {
      method: "POST",
      // headers: { "Content-type": "multipart/form-data" },
      body: data,
    });
  }
  const [files2, setFiles2] = useState();
  const handleFile = (y) => {
    setFiles2(y.target.files);
  };
  const [fileRealDisplay, setFileRealDisplay] = useState([]);
  const [fileDisplay, setFileDisplay] = useState([]);

  async function handleUploadFiles() {
    const docs = [];

    for (let i = 0; i < files2.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId);
      container1.append(`file`, files2[i]);
      const sendFile = await SendFile(container1);
      const sendFileResponse = await sendFile.json();
      docs.push(sendFileResponse);
    }
    setFileDisplay(docs);
  }

  function SendFile(data) {
    return fetch(URL + "/upload/document", {
      method: "POST",
      // headers: { "Content-type": "multipart/form-data" },
      body: data,
    });
  }

  useEffect(() => {
    CategoryService.findByParentId(1).then((result) => {
      setMainCategories(result);
    });
  }, []);

  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentId(parentId).then((result) => {
      setFirstLevelCategories(result);
    });
  };

  const getSecondLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setFirstLevelCategory(parentId);
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="">
            <form className="container" onSubmit={saveProduct}>
              <div className="card" style={{ textAlign: "left" }}>
                <div className="card-title">
                  <h2>Редактирование</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <input
                        type="hidden"
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      />
                      <div className="form-group">
                        <label htmlFor="main">
                          Выберите основную категорию:
                        </label>
                        <select
                          required
                          className="category-select"
                          value={mainCategory}
                          onChange={getFirstLevelCategoryByParent}
                        >
                          <option value="">--</option>
                          {mainCategories.map((category) => (
                            <option
                              name="option-main"
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="uroven1">Выберите под категорию:</label>
                        <select
                          required
                          className="category-select"
                          value={firstLevelCategory}
                          onChange={getSecondLevelCategoryByParent}
                        >
                          <option value="">--</option>
                          {firstLevelCategories.map((category) => (
                            <option
                              name="option"
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="">ID</label>
                        <input
                          value={id}
                          disabled="disabled"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                          required
                          value={name}
                          onMouseDown={(e) => valchange(true)}
                          onChange={(e) => namechange(e.target.value)}
                          className="form-control"
                        />
                        {name.length === 0 && validation && (
                          <span className="text-danger">Enter the name</span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <input
                          value={description}
                          onChange={(e) => descriptionchange(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-check-label" htmlFor="">
                          Новинка
                        </label>
                        <input
                          checked={isNew}
                          onChange={(e) => isNewchange(e.target.checked)}
                          type="checkbox"
                        />
                      </div>
                    </div>
                    <label>Ссылка для видео:</label>
                    <input
                      type="url"
                      value={video}
                      onChange={(e) => setVideo_pr(e.target.value)}
                    />
                    <div className="d-inline-block">
                      <ReactPlayer
                        className="img-thumbnail"
                        url={video}
                        controls
                        width="200px"
                        height="150px"
                      />
                    </div>
                    <div className="all">
                      <div className="article_size">
                        <label>Артикул и размер</label>
                      </div>

                      <div>
                        <label>Артикул товара</label>
                        <input
                          type="text"
                          value={article || ""}
                          onChange={(y) => setArticle(y.target.value)}
                        />

                        <label>Размер товара</label>
                        <input
                          type="number"
                          value={size || ""}
                          onChange={(y) => setSize(y.target.value)}
                        />
                      </div>

                      <ToastContainer />
                      <button onClick={handleSubmit1}>Добавить</button>

                      <table>
                        <thead>
                          <tr>
                            <td>Артикул</td>
                            <td>Размер</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                          {productArticleAndSize.map((product) => {
                            return (
                              product.isRemoved == false && (
                                <tr key={product.id}>
                                  <td>{product.article}</td>
                                  <td>{product.size}</td>
                                  <td>
                                    <a
                                      onClick={() => {
                                        LoadEdit(product.id);
                                      }}
                                      className="btn btn-success"
                                    >
                                      Редакт.
                                    </a>
                                    <a
                                      onClick={() => {
                                        Removefunction(product);
                                      }}
                                      className="btn btn-danger"
                                    >
                                      Удалить
                                    </a>
                                  </td>
                                </tr>
                              )
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <label>Загрузить фото:</label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      // value={files}
                      onChange={handleImage}
                    />
                    -{imageDisplay.length}-
                    {imageDisplay.map((product) => {
                      return (
                        <div className="img-thumbnail">
                          {product.filename}
                          <br />
                          <img
                            src={imgPrefixURL + "/images/" + product.filename}
                            alt="Filepath"
                            className="img-thumbnail"
                          />
                        </div>
                      );
                    })}
                    <div className="container">
                      <div className="row">
                        {imgRealDisplay
                          .filter((s) => s.filename.startsWith("thumbnail-"))
                          .map((product) => (
                            <div
                              className="col-md-4 mb-3"
                              key={product.filename}
                            >
                              <div className="img-thumbnail">
                                <p>{product.filename}</p>
                                <img
                                  src={imgPrefixURL + "/images/" + product.filename}
                                  alt="Filepath"
                                  className="img-thumbnail"
                                />
                                <div className="col-12 mt-2">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    Удалить
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button
                          className="btn btn-primary"
                          onClick={handleUpload}
                        >
                          Загрузить
                        </button>
                      </div>
                    </div>
                    <label>Загрузить файлы:</label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      // value={files}
                      onChange={handleFile}
                    />
                    -{fileDisplay.length}-
                    {fileDisplay.map((product) => {
                      return (
                        <div className="img-thumbnail">
                          {product.filename}
                          <br />
                          <img
                            src={imgPrefixURL + "/images/" + product.filename}
                            alt="Filepath"
                            className="img-thumbnail"
                          />
                        </div>
                      );
                    })}
                    <div className="container">
                      <div className="row">
                        {fileRealDisplay.map((product) => (
                          <div className="col-md-4 mb-3" key={product.filename}>
                            <div className="img-thumbnail">
                              <div className="img-thumbnail">
                                <p>{product.filename}</p>
                                <img
                                  src={imgPrefixURL + "/images/" + product.filename}
                                  alt="Filepath"
                                  className="img-thumbnail"
                                />
                                <div className="col-12 mt-2">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    Удалить
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button
                          className="btn btn-primary"
                          onClick={handleUploadFiles}
                        >
                          Загрузить files
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Сохранить
                        </button>
                        {/* <Link to='/adminpage/prodlisting' className='btn btn-danger' >Назад</Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* </form>
      </div>
    </div>
    </div>
    </>
 */}
    </>
  );
};
