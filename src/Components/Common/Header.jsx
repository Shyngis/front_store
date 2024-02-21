import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserService from "../services/UserService";
import { URL } from "./ddata";

import Modal from "react-bootstrap/Modal";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const size = "lg";

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [queryImg, setQueryImg] = useState("");
  const [data, setData] = useState("");
  const [dataImg, setDataImg] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const login = () => {
    const form = { username: username, password: password };
    UserService.login(form)
      .then((result) => {
        localStorage.setItem("santec_items", JSON.stringify(result));
        navigate("/adminPage");
        setShow(false);
      })
      .catch((error) => {});

    // setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/search", { state: { data, query } });
  };

  useEffect(() => {
    fetch(URL + "/product/search-ext?query=" + query)
      .then((response) => response.json())
      .then((data1) => setData(data1));
  }, [query]);

  // useEffect(() => {
  //   fetch(URL + "/product/search-ext?query=" + query)
  //     .then((response) => response.json())
  //     .then((data1) => setDataImg(data1));
  // }, []);
  // const fetchData = () => {
  //   fetch(URL + "/product/search?query=" + query)
  //     .then((response) => response.json())
  //     .then((data1) => setData(data1.name));
  // };
  // console.log(data);

  return (
    <>
      <Navbar key={size} expand={size} className="bg-body-tertiary mb-3 mt-4">
        <Container fluid>
          <Form
            className="d-flex  flex-md-row align-items-center"
            style={{ margin: "10px", maxHeight: "66px" }}
          >
            <Navbar.Brand href="/" className="me-2">
              <img src={logo} alt="logosure" className="logo" />
            </Navbar.Brand>
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              variant="outline-danger"
              style={{ paddingTop: "5px", margin: "10px" }}
            >
              Поиск
            </Button> */}

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${size}`} />
          </Form>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${size}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${size}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${size}`}>
                <img src={logo} alt="logosure" className="logo-in-mobile" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <form className="search-input" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск"
                    aria-label="Поиск"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>

              <Nav className="justify-content-end flex-grow-1 pe-3  ">
                <a className="nav-underline nav-link" href="/">
                  Главная
                </a>
                <a className="nav-underline nav-link" href="/aboutus">
                  О нас
                </a>
                <a className="nav-underline nav-link" href="/contacts">
                  Контакты
                </a>
                <a className="nav-underline nav-link" href="tel:+7(705)2396303">
                  +7(705)2396303
                </a>
                <button
                  className="sign-in-button btn btn-sm btn-outline-secondary"
                  onClick={handleShow}
                >
                  <i className="fa fa-sign-in"></i>
                </button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="email"
                placeholder="santec@mail.ru"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal_footer mx-auto"
            variant="primary"
            onClick={login}
          >
            Вход
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

<div className="jogargysy ">
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
    <ul className="nav nav-underline  flex-column flex-sm-row">
      <li className="nav-item">
        <Link className="nav-link" to="/catalog">
          Главная
        </Link>
      </li>

      <li>
        <a className="nav-link" href="">
          О нас
        </a>
      </li>
      <li>
        <a className="nav-link" href="">
          Контакты
        </a>
      </li>
      <li>
        <Link className="nav-link" to="/adminpage">
          Управление
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          Вход
        </Link>
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
</div>;
