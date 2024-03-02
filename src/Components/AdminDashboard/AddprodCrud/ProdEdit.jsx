import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL, docPrefixURL, imgPrefixURL } from "../../Common/ddata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
import FileService from "../../services/FileService";
import ReactPlayer from "react-player";
import "./ProdEdit.css";
import ProductSizeService from "../../services/ProductSizeService";
import BrandService from "../../services/BrandService";

import Typewriter from "typewriter-effect";
import Spinner from "react-bootstrap/Spinner";

export const ProdEdit = () => {
  const { empid } = useParams();
  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");

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
        setIsSantec(resp.isSantec);
        setBrand(resp.brand);

        if (resp.category) {
          CategoryService.findLevelCategoriesById(resp.category).then(
            (result) => {
              if (result) {
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

        FileService.findImagesByContainerId(resp.id).then((data) => {
          setImgRealDisplay(data);
        });

        FileService.findDocumentByContainerId(resp.id)
          .then((data) => {
            setFileRealDisplay(data);
          })
          .catch((err) => console.log(err));

        console.log("Product doesn accesable fetched from server ");
      })
      .catch((err) => {
        console.log(err.message);
      });

    BrandService.getBrands().then((result) => {
      setBrands(result);
    });
  }, []);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [description, descriptionchange] = useState("");
  const [isNew, isNewchange] = useState(true);
  const [isSantec, setIsSantec] = useState(false);
  const [video, setVideo_pr] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const saveProduct = (e) => {
    e.preventDefault();
    const product = {
      id,
      name,
      category: firstLevelCategory,
      description,
      isNew,
      video,
      isSantec,
      brand,
    };

    ProductService.update(product)
      .then((res) => {
        toast.success("Успешно сохранено !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("Ошибка при сохранении !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const [article, setArticle] = useState("");
  const [size, setSize] = useState("");
  const [productId, setproductId] = useState();
  const [product, setproduct] = useState();

  const [productArticleAndSize, setProductArticleAndSize] = useState([]);

  const handleSubmit1 = (y) => {
    if (!article || !size) {
      toast.error("Данные отсутствуют", {
        position: toast.POSITION.TOP_RIGHT,
      });
      y.preventDefault();
      return;
    }

    toast.success("Успешно добавлено !", {
      position: toast.POSITION.TOP_RIGHT,
    });

    y.preventDefault();

    const productsi = {
      article,
      size,
      product,
    };

    fetch(URL + "/product/size", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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
        setProductArticleAndSize(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const LoadEdit = (id) => {
    navigate("/adminpage/prodlisting/prodedit/" + empid + "/" + id);
  };

  const removeArticleAndSize = (productSize) => {
    const productSizeID = productSize.id;
    ProductSizeService.remove(productSizeID).then((result) => {
      toast.success("Успешно удалено !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const newProductArticleAndSize = productArticleAndSize.map((item) => {
        if (item.id === productSizeID) {
          return { ...item, isRemoved: true };
        }
        return item;
      });
      setProductArticleAndSize(newProductArticleAndSize);
    });
  };
  const Removefunction = (product) => {
    FileService.removeById(product.id)
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

  const removeFileandImage = (id) => {
    const newProductFileandImage = imgRealDisplay.map((paz) => {
      if (paz === id) {
        return { ...paz, isRemoved: true };
      }
      return paz;
    });

    setImgRealDisplay(newProductFileandImage);
  };

  const [files, setFiles] = useState();

  const handleImage = (y) => {
    y.preventDefault();
    setFiles(y.target.files);
  };
  const [imgRealDisplay, setImgRealDisplay] = useState([]);
  const [imageDisplay, setimageDisplay] = useState([]);

  async function handleUpload(y) {
    y.preventDefault();
    const images = [];

    if (!files || files.length === 0) {
      toast.warning("Не удалось загрузить картинки!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      showLoaderImg();
      for (let i = 0; i < files.length; i++) {
        const container1 = new FormData();
        container1.append("container", productId);
        container1.append(`file`, files[i]);

        // const sendImage = await Send(container1);
        const sendImage = await FileService.syncUpload(container1);
        const sendImageResponse = await sendImage.json();
        images.push(sendImageResponse);
      }
      hideLoaderImg();
      setimageDisplay(images);
      toast.success("Успешно  загружено!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  const [isLoadingImg, setIsLoadingImg] = useState(false);

  const showLoaderImg = () => {
    setIsLoadingImg(true);
  };

  const hideLoaderImg = () => {
    setIsLoadingImg(false);
  };
  const [files2, setFiles2] = useState();
  const [fileRealName, setFileRealName] = useState("");

  const handleFileRealName = async (t) => {
    t.preventDefault();

    const fileServ = {
      id: documentID,
      description: fileRealName,
    };

    FileService.updateDescription(fileServ)
      .then((data) => {
        setFileRealName(data.name);
        toast.success("Успешно обновлено !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFile = (y) => {
    setFiles2(y.target.files);
  };
  const [fileRealDisplay, setFileRealDisplay] = useState([]);
  const [fileDisplay, setFileDisplay] = useState([]);
  const [documentID, setDocumentID] = useState();

  async function handleUploadFiles(y) {
    y.preventDefault();
    const docs = [];
    if (!files2 || files2.length === 0) {
      toast.warning("Не удалось загрузить файлы!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      showLoader();
      for (let i = 0; i < files2.length; i++) {
        const container1 = new FormData();
        container1.append("container", productId);
        container1.append(`file`, files2[i]);
        const sendFile = await FileService.syncUploadDocument(container1);
        const sendFileResponse = await sendFile.json();
        docs.push(sendFileResponse);
      }
      hideLoader();
      setFileDisplay(docs);
      setDocumentID(docs[0].id);
      if (docs[0].id == null || undefined || false) {
        toast.error("Не удалось загрузить файлы!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Успешно  загружено!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    CategoryService.findByParentIdPrivate(1).then((result) => {
      setMainCategories(result);
    });
  }, []);

  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentIdPrivate(parentId).then((result) => {
      setFirstLevelCategories(result);
    });
  };

  const getSecondLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setFirstLevelCategory(parentId);
  };

  const removeById = (id, type) => {
    FileService.removeById(id).then((result) => {
      if (result) {
        if (type == "doc") {
          FileService.findDocumentByContainerId(empid)
            .then((data) => {
              setFileRealDisplay(data);
            })
            .catch((err) => console.log(err));
        } else {
          FileService.findImagesByContainerId(empid).then((data) => {
            setImgRealDisplay(data);
          });
        }
      }
    });
  };

  return (
    <>
      <div>
        {/* <div className="row"> */}
        <div className="">
          <form>
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
                      <label htmlFor="main">Выберите основную категорию:</label>
                      <select
                        required
                        className="category-select"
                        value={mainCategory}
                        onChange={getFirstLevelCategoryByParent}
                      >
                        <option value="">--</option>
                        {mainCategories &&
                          mainCategories.map((category) => (
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
                      <label htmlFor="uroven1">Выберите под категорию: </label>
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
                      <label htmlFor="uroven1">Выберите Брэнд: </label>
                      <select
                        required
                        className="category-select"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="">--</option>
                        {brands.map((item) => (
                          <option
                            name="option"
                            key={item.code}
                            value={item.code}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label className="form-label" htmlFor="">
                        Наименование
                      </label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      />
                      {name.length === 0 && validation && (
                        <span className="text-danger">
                          Заполнить Наименование
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="">
                        Описание
                      </label>
                      <input
                        value={description}
                        onChange={(e) => descriptionchange(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-check-label"> Новинка </label>
                        <input
                          className="form-check-input"
                          checked={isNew}
                          onChange={(e) => isNewchange(e.target.checked)}
                          type="checkbox"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-check-label">
                          {" "}
                          Продукция SANTEC{" "}
                        </label>
                        <input
                          className="form-check-input"
                          checked={isSantec}
                          onChange={(e) => setIsSantec(e.target.checked)}
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group  mb-3">
                    <label className="form-label">Ссылка для видео: </label>
                    <input
                      className="form-control"
                      type="url"
                      value={video}
                      onChange={(e) => setVideo_pr(e.target.value)}
                    />
                  </div>

                  <div className="d-inline-block mb-3">
                    <ReactPlayer
                      className="img-thumbnail"
                      url={video}
                      controls
                      width="200px"
                      height="150px"
                    />
                  </div>

                  <hr />

                  <fieldset>
                    <legend>Артикул и размер</legend>
                    <div>
                      <label className="form-label">Артикул товара</label>
                      <input
                        className="form-control"
                        type="text"
                        value={article || ""}
                        onChange={(y) => setArticle(y.target.value)}
                      />
                      <label className="form-label">Размер товара</label>
                      <input
                        className="form-control"
                        type="text"
                        value={size || ""}
                        onChange={(y) => setSize(y.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="mt-3 btn btn-sm  btn-primary"
                        onClick={handleSubmit1}
                      >
                        Добавить
                      </button>
                    </div>
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
                                      if (
                                        window.confirm(
                                          "Вы действительно хотите удалить?"
                                        )
                                      ) {
                                        removeArticleAndSize(product);
                                      }
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
                  </fieldset>

                  <hr />
                  <br />
                  <div className="col-md-12">
                    <label>Выбрать картинки для продукта: </label>
                    <input
                      className="btn btn-sm btn-outline-primary"
                      type="file"
                      name="file"
                      multiple
                      onChange={handleImage}
                    />

                    <div className="col-lg-12 mb-3 UploadFilebutton">
                      <div className="form-group">
                        <button
                          className="btn btn-sm  btn-primary"
                          onClick={handleUpload}
                        >
                          Загрузить
                        </button>
                        <hr />
                        {isLoadingImg && (
                          <>
                            <Spinner animation="border" variant="primary" />
                          </>
                        )}
                      </div>
                    </div>
                    {imageDisplay.map((product) => {
                      return (
                        product.isRemoved == false && (
                          <div className="img-thumbnail" key={product.id}>
                            {product.filename}
                            <br />
                            <img
                              src={imgPrefixURL + "/" + product.filename}
                              alt="Filepath"
                              className="img-thumbnail"
                            />
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className="container">
                    <div className="row">
                      {imgRealDisplay
                        .filter((s) => s.filename.startsWith("thumbnail-"))
                        .map(
                          (product) =>
                            product.isRemoved == false && (
                              <div className="col-md-4 mb-3" key={product.id}>
                                <div className="img-thumbnail">
                                  <p>{product.filename}</p>
                                  <img
                                    src={imgPrefixURL + "/" + product.filename}
                                    alt="Filepath"
                                    className="img-thumbnail"
                                  />
                                  <div className="col-12 mt-2">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Вы действительно хотите удалить?"
                                          )
                                        ) {
                                          removeById(product.id, "image");
                                        }
                                      }}
                                    >
                                      Удалить
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                    </div>
                  </div>

                  <hr />
                  <br />

                  <div class="col-md-12">
                    <label className="form-label">
                      Загрузить паспорта и сертификаты:{" "}
                    </label>
                    <input
                      className="form-input"
                      type="file"
                      name="file"
                      // multiple
                      onChange={handleFile}
                    />
                  </div>
                  <div className="col-lg-12 mb-3 UploadFilebutton">
                    <div className="form-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleUploadFiles}
                      >
                        Загрузить паспорта и сертификаты
                      </button>
                      <hr />
                      {isLoading && (
                        <>
                          <Spinner animation="border" variant="secondary" />
                        </>
                      )}
                    </div>
                  </div>
                  <hr />
                  <>
                    {fileDisplay.map((product) => {
                      return product.id != null || undefined || false ? (
                        <fieldset>
                          <table>
                            <thead>
                              <tr>
                                <td>ID</td>

                                <td>Файл</td>

                                <td>Название</td>
                                <td>Action</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={product.id}>
                                <td
                                  value={product.id}
                                  onChange={(p) =>
                                    setDocumentID(p.target.value)
                                  }
                                >
                                  {product.id}
                                </td>

                                <td>
                                  <a
                                    href={docPrefixURL + product.filename}
                                    target="_blank"
                                  >
                                    <i className="fa fa-file-pdf-o pdfFile"></i>
                                    <p>{product.filename}</p>
                                  </a>
                                </td>

                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="file"
                                    value={fileRealName}
                                    onChange={(t) =>
                                      setFileRealName(t.target.value)
                                    }
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-success"
                                    onClick={handleFileRealName}
                                  >
                                    Save
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </fieldset>
                      ) : (
                        <div class="alert alert-danger" role="alert">
                          Не удалось загрузить. Возможные причины: ошибка
                          сервера, слишком большие данные!
                        </div>
                      );
                    })}
                  </>

                  <div className="container ">
                    <div className="row ">
                      {fileRealDisplay.map((product) => (
                        <div className="col-md-4 mb-3 " key={product.id}>
                          <div className="img-thumbnail position-relative ">
                            <div className="d-flex align-items-center ">
                              <a
                                href={docPrefixURL + product.filename}
                                target="_blank"
                                className="d-flex"
                              >
                                <i className="fa fa-file-pdf-o pdfFile"></i>
                                <span className="file_name">
                                  {product.description}
                                </span>
                              </a>
                              <div className="deleteButton ">
                                <a
                                  className="btn btn-danger "
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Вы действительно хотите удалить?"
                                      )
                                    ) {
                                      removeById(product.id, "doc");
                                    }
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
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
                        className="btn btn-success float-right"
                        // type="submit"
                        onClick={saveProduct}
                      >
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
      {/* </div> */}

      {/* </form>
      </div>
    </div>
    </div>
    </>
 */}
      <ToastContainer />
    </>
  );
};
