  {records.map((categor) => {
                          
  if (categor.name === category) {
    return <input type="text" 
    // key={categor.id} 
    value={categor.id} 
    onChange={(y)=>setCategory_id(y.target.value)} />;
  } 
  return null;
})}



  const handleAdd = () => {
    setArtSizeData([...artSizeData, { article: "", size: "" }]);
    
  };

//  articul and size

const handleDelete = (i) => {
    const updatedData = [...artSizeData];
    updatedData.splice(i, 1);
    setArtSizeData(updatedData);
  };


 // const handleChange = (y) => {
  //   // const updatedData = [...artSizeData];
  //   // updatedData[i][field] = value;
  //   // setArtSizeData(updatedData);
    


  // };


 <div className="article_size">
            <label>Артикул и размер</label>
            <button type="button" className="adding_pr" onClick={handleAdd}>
              Добавить
            </button>
          </div>

          {artSizeData.map((data, i) => (
            <div key={i}>
              <label>Артикул товара</label>
              <input 
                type="text"
                value={data.article}
                onChange={(y) => handleChange(i, "article", y.target.value)}
                required
              />  


              <label>Размер товара</label>
              <input
                type="number"
                value={data.size}
                onChange={(y) => handleChange(i, "size", y.target.value)}
                required
              />

              <button type="button" onClick={() => handleDelete(i)}>
                Удалить
              </button>
            </div>
          ))}

              <button onClick={handleSubmit1}>Upload1art</button>



              <div key={product.id}>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Decription</td>
             <td>Action</td>
          </tr>
        </thead>
        <tbody>
        {product.map((product)=>(
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.article}</td>
            <td>{product.size}</td>
           
             <td>
                <button>Edit</button>
                <button>Remove</button>
                <button>Details</button>
              </td>
          </tr>
       ))} 
          




       {productArticleAndSize.length > 0 && (
        <table>
        <thead>
              <tr>
                <td>Артикул</td>
                <td>Размер</td>
              </tr>
        </thead>
          <tbody>
            {productArticleAndSize.map((product) => (
              <tr key={product.id}>
                <td>{product.article}</td>
                <td>{product.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      useEffect(()=>{
       {
      fetch(URL+"/product/size/"+idpr)
        .then((res)=>{
          return res.json();
        })
        .then((resp) =>{
        setProductsize(resp);
        console.log("seen");
        console.log(idpr);

        })
        .catch((err) =>{
          console.log(err.message);
        })
}
    }, [])











     {imgRealDisplay.map((product) => {
                      return (
                        <div className="img-thumbnail"><p>
                        {product.filename}
                        </p>
                          <img
                           src={imgURL+"/images/thumbnail-"+product.filename} alt="Filepath"
                             className="img-thumbnail"
                           />
                         
                        </div>
                        
                      )
                    })}












                    <div className="jogargysy">
        <header>
          <input type="checkbox" name="" id="chk1" />
          <div className="logo"></div>
          <div className="search-box">
            <form action="">
              <input type="text" name="search" id="srch" placeholder="Поиск" />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <ul class="navbar">
            <li>
              <Link to="/catalog">Главная</Link>
            </li>
            {/* <li>
              <a href="#">Техподдержка</a>
              <ul className='dropdown'>
                <li><a href="">Что-то новое</a></li>
                <li><a href="">Агент</a></li>
                <li><a href="">Месс</a></li>
                <li><a href="">Дуо</a></li>
              </ul>
            </li> */}
            <li>
              <a href="">О нас</a>
            </li>
            <li>
              <a href="">Контакты</a>
            </li>
            <li>
              <Link to="/adminpage">Управление</Link>
            </li>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              8(700) 496-9087
            </li>
          </ul>
          <div className="menu">
            <label htmlFor="chk1">
              <i className="fa fa-bars"></i>
            </label>
          </div>
        </header>
      </div>


      <section className="cat">
        {mainCategories.map((category) => (
          <Link to={`/catalog/first-level/${category.id}`}>
            <div className="cards_cat">
              <div className="image_box_cat">
                {/* <img src={category.image_cat} alt="" /> */}
                <img src="https://valtec.ru/image/groups/1.jpg" alt="" />
              </div>
              <div className="details_cat">
                <p>{category.name}</p>
              </div>
            </div>
          </Link>
        ))}



         <section className="cat_prod">
      <>
        {categories.map((category) => (
          <Link to={`products/${category.id}`}>
            <div className="cards">
              <div className="image_box">
                <img src={category.image} alt="" />
              </div>
              <div className="details">
                <p>{category.name}</p>
                <p>{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    </section>





     <div className="container-fluid my-4">
        <div className="row justify-content-center">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2 my-3"
            >
              <Card style={{ width: "10rem" }}>
                <Link
                  to={`/catalog/first-level/${category.id}`}
                  className="card-link d-block h-100"
                >
                  <Card.Img
                    variant="top"
                    src="https://valtec.ru/image/groups/1.jpg"
                  />
                  <Card.Body style={{ width: "10rem" }}>
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="overflow-hidden text-ellipsis">
                      This is an example React card
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>






      <div class="row row-cols-2 row-cols-xs-2  row-cols-md-6 row-cols-sm-4 ">
        <div class="col" style={{ width: "200px", height: "300px" }}>
          {mainCategories.map((category) => (
            <Link
              to={`/catalog/first-level/${category.id}`}
              className="card-link d-block h-100"
            >
              <div class="card h-10" key={category.id}>
                <div class="card-body">
                  <img
                    src="https://valtec.ru/image/groups/1.jpg"
                    class="card-img-top"
                    alt="..."
                  />
                  <h5
                    class="card-title"
                    style={{
                      maxHeight: "60px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {category.name}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>







      <Navbar key={size} expand={size} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Form className="d-flex m-6">
            <Navbar.Brand href="#">SantehPlast</Navbar.Brand>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ padding: "5px", margin: "20px" }}
            />
            <Button
              variant="outline-success"
              className="me-5"
              style={{ padding: "5px", margin: "20px" }}
            >
              Поиск
            </Button>
            <div className="ms-auto">
              <Navbar.Toggle
                // className="ms-2"
                aria-controls={`offcanvasNavbar-expand-${size}`}
              />
            </div>
          </Form>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${size}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${size}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${size}`}>
                Santehplast
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link>
                  <Link className="nav-link " to="/catalog">
                    Главная
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/catalog">
                    О нас
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/catalog">
                    Контакты
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/adminpage">
                    Управление
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" to="/login">
                    Вход
                  </Link>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>







       const [files2, setFiles2] = useState();

  const handleFile = (y) => {
    setFiles2(y.target.files2);
  };

  const [fileDisplay, setFileDisplay] = useState([]);

  async function handleUploadFile() {
    const files1 = [];

    for (let i = 0; i < files2.length; i++) {
      const container1 = new FormData();
      container1.append("container", productId);
      container1.append(`file`, files2[i]);
      const sendFile = await SendFile(container1);
      const sendFileResponse = await sendFile.json();
      files1.push(sendFileResponse);
    }
    setFileDisplay(files1);
  }





  function SendFile(data) {
    return fetch(URL + "/upload/document", {
      method: "POST",
      // headers: { "Content-type": "multipart/form-data" },
      body: data,
    });
  }

  const [fileRealDisplay, setFileRealDisplay] = useState([]);














  -{fileDisplay.length}-
                    {fileDisplay.map((product) => {
                      return (
                        <div className="img-thumbnail">
                          {product.filename}
                          <br />
                          <img
                            src={imgURL + "/images/" + product.filename}
                            alt="Filepath"
                            className="img-thumbnail"
                          />
                        </div>
                      );
                    })}
                    <div className="container">
                      <div className="row">
                        {fileRealDisplay
                          .filter((s) => s.filename.startsWith("thumbnail-"))
                          .map((product) => (
                            <div
                              className="col-md-4 mb-3"
                              key={product.filename}
                            >
                              <div className="img-thumbnail">
                                <p>{product.filename}</p>
                                <img
                                  src={imgURL + "/images/" + product.filename}
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
                          onClick={handleUploadFile}
                        >
                          Загрузить файлы
                        </button>
                      </div>
                    </div>






                    <div className="row" style={{ paddingLeft: "90px", paddingTop: "20px" }}>
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className="col-6 col-xs-12 col-sm-4 col-md-3 col-lg-2 my-3"
            style={{ width: "220px", height: "25  0px" }}
          >
            <Link to={`/catalog/first-level/${category.id}`}>
              <Card>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="https://valtec.ru/image/groups/1.jpg"
                    style={{
                      width: "150px",
                      height: "140px",
                      padding: "10px",

                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  />
                  <Card.Title style={{ height: "10px" }}>
                    {category.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>





      <section className="row">
      <>
        {records.map((record) => (
          <Link to={`second-level/${record.name}`}>
            <div className="col">
              <div className="image_box">
                <img src={record.image} alt="" />
              </div>
              <div className="details">
                <p>{record.name}</p>
                <p>{record.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    </section>











    <section className="cat_prod">
      <>
        {products.map((product) => (
          <Link to={ `product/${product.id}`}>
            <div className="cards">
              <div className="image_box">
                <img src={product.image} alt="" />
              </div>
              <div className="details">
                <p>{product.name}</p>
                <p>{product.description}</p>
              </div>
            </div>
          </Link>
        ))}

      </>
    </section>
    