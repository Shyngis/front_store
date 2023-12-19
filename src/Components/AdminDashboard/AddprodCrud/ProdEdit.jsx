import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { URL } from '../../Common/ddata';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from '../../services/CategoryService';

export const ProdEdit = () => {
  const { empid } = useParams();

  // const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch(URL + "/product/id/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        categorychange(resp.category)
        namechange(resp.name)
        descriptionchange(resp.description)
        isNewchange(resp.isNew);
        setproduct(resp.id);
        console.log("see ");
      })
      .catch((err) => {
        console.log(err.message);
      })

  }, [])

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [category, categorychange] = useState("");
  const [description, descriptionchange] = useState("");
  const [isNew, isNewchange] = useState(true);
  const [video, setVideo_pr] = useState("")
  const [validation, valchange] = useState(false)

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    const empdata = { id, name, category, description, isNew, video };
    fetch(URL + "/product", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata)
    })
      .then((res) => {
        alert("Saved Succesfully")

        navigate('/adminpage/prodlisting')
      }).catch((err) => {
        console.log(err.message);
      })

  }



  const [article, setArticle] = useState("");
  const [size, setSize] = useState("");
  const [productId, setproductId] = useState();
  const [product, setproduct] = useState();
  const [firstLevelCategory, setFirstLevelCategory] = useState();
  const [secondLevelCategory, setSecondLevelCategory] = useState();

  const [mainCategory, setMainCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);
  const [secondLevelCategories, setSecondLevelCategories] = useState([]);


  const [productArticleAndSize, setProductArticleAndSize] = useState([]);


  const handleSubmit1 = (y) => {

    y.preventDefault();
    toast.success("Успешно добавлено !", {
      position: toast.POSITION.TOP_RIGHT,
    })

    const productsi = {
      article,
      size,
      product
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
        setProductArticleAndSize([...productArticleAndSize, product])

      })

  };

  // const[productsize,setProductsize] = useState([])

  useEffect(() => {
    fetch(URL + "/product/size/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        //  setProductsize(resp);
        setProductArticleAndSize(resp)
        console.log("seen");

      })
      .catch((err) => {
        console.log(err.message);
      })

  }, [])


  const LoadEdit = (id) => {
    navigate("/adminpage/prodlisting/prodedit/" + empid + "/" + id);
    console.log("loadedit");

  }

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
        })

      }).catch((err) => {
        console.log(err.message);
      })



  }
  const [files, setFiles] = useState();

  const handleOzgert = (y) => {
    setFiles(y.target.files);
    // setPhoto_pr(y.target.value);
    // setPhoto_pr(y.target.image);
  }


  function handleUpload() {
    for (let i = 0; i < files.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId)
      container1.append(`file`, files[i])
      Send(container1);
      console.log('container1', container1);
    }
  }
  function Send(data) {
    fetch(URL + '/upload/image', {
      method: 'POST',
      // headers: { "Content-type": "multipart/form-data" },
      body: data
    }).then(res => res.json()).
      then(data => console.log(data)).
      catch(err => console.log(err));
  }

  useEffect(() => {
    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });

    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });

    CategoryService.findByParentId(1)
      .then((result) => {
        setMainCategories(result);
      });

  }, []);

  const getFirstLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setMainCategory(parentId);
    CategoryService.findByParentId(parentId)
      .then((result) => {
        setFirstLevelCategories(result);
      });
  }

  const getSecondLevelCategoryByParent = (y) => {
    y.preventDefault();
    const parentId = y.target.value;
    setFirstLevelCategory(parentId);

    CategoryService.findByParentId(parentId)
      .then((result) => {
        setSecondLevelCategories(result);
      });
  }

  return (
    <div>
      <div className='row'>
        <div className="">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ "textAlign": "left" }}>
              <div className="card-title">
                <h2>Редактирование</h2>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <input type='hidden' value={id} disabled="disabled" className='form-control' />
                    <div className="form-group">
                      <label htmlFor="main">Выберите основную категорию:</label>
                      <select className="category-select" value={mainCategory} onChange={getFirstLevelCategoryByParent}>
                        {mainCategories.map((category) => (
                          <option
                            name="option-main"
                            key={category.id}
                            value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">


                      <label htmlFor="uroven1">Выберите категорию уровень 1:</label>
                      <select className="category-select" value={firstLevelCategory} onChange={getSecondLevelCategoryByParent}>
                        {firstLevelCategories.map((category) => (
                          <option
                            name="option"
                            key={category.id}
                            value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">

                      <label htmlFor="cars">Выберите категорию уровень 2:</label>

                      <select value={secondLevelCategory} onChange={(y) => setSecondLevelCategory(y.target.value)}>
                        {secondLevelCategories.map((categor) => (
                          <option

                            name="option"
                            key={categor.id}
                            value={categor.id || ''}>
                            {categor.name}
                          </option>

                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="">ID</label>
                      <input value={id} disabled="disabled" className='form-control' />

                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input required value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className='form-control' />
                      {name.length === 0 && validation && <span className='text-danger'>Enter the name</span>}
                    </div>
                  </div>
                  
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="">Description</label>
                      <input value={description} onChange={e => descriptionchange(e.target.value)} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className='form-check-label' htmlFor="">Новинка</label>
                      <input checked={isNew} onChange={e => isNewchange(e.target.checked)} type='checkbox' />
                    </div>
                  </div>
                  <label>Ссылка для видео:</label>
                  <input type="url" value={video} onChange={e => setVideo_pr(e.target.value)} />

                  <div className='all'>

                    <div className="article_size">
                      <label>Артикул и размер</label>
                    </div>


                    <div>
                      <label>Артикул товара</label>
                      <input
                        type="text"
                        value={article || ''}
                        onChange={(y) => setArticle(y.target.value)}
                        required
                      />


                      <label>Размер товара</label>
                      <input
                        type="number"
                        value={size || ''}
                        onChange={(y) => setSize(y.target.value)}
                        required
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
                            product.isRemoved == false &&

                            <tr key={product.id} >
                              <td>{product.article}</td>
                              <td>{product.size}</td>
                              <td>
                                <a onClick={() => { LoadEdit(product.id) }} className='btn btn-success'>Редакт.</a>
                                <a onClick={() => { Removefunction(product) }} className='btn btn-danger'>Удалить</a>


                              </td>
                            </tr>

                          )
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
                    onChange={handleOzgert}
                  />
                  <label>Загрузить файлы:</label>
                  <input
                    type="file"
                    name="file"
                    multiple
                    // value={files}
                    onChange={handleOzgert}

                  />

                  {/* <button onClick={handleUpload}>Загрузить</button> */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className='btn btn-primary' onClick={handleUpload}>Загрузить</button>
                      <button className='btn btn-success' type='submit'>Сохранить</button>
                      {/* <Link to='/adminpage/prodlisting' className='btn btn-danger' >Назад</Link> */}
                    </div>
                  </div>
                </div >
              </div >
            </div >


          </form >
        </div >
      </div >
    </div >
  )
}
