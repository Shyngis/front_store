import React from "react";
// import "./header.css";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

export const Header = () => {
  const size = "md";
  return (
    <>
      <Navbar key={size} expand={size} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Form className="d-flex m-6">
            <Navbar.Brand href="#">SantehPlast</Navbar.Brand>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-5">
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
                  <Link className="nav-link" to="/catalog">
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
    </>
  );
};

// <div className="jogargysy ">
//   <header>
//     <input type="checkbox" name="" id="chk1" />
//     <div className="logo"></div>
//     <div className="search-box">
//       <form action="">
//         <input type="text" name="search" id="srch" placeholder="Поиск" />
//         <button type="submit">
//           <i className="fa fa-search"></i>
//         </button>
//       </form>
//     </div>
//     <ul className="nav nav-underline  flex-column flex-sm-row">
//       <li className="nav-item">
//         <Link className="nav-link" to="/catalog">
//           Главная
//         </Link>
//       </li>

//       <li>
//         <a className="nav-link" href="">
//           О нас
//         </a>
//       </li>
//       <li>
//         <a className="nav-link" href="">
//           Контакты
//         </a>
//       </li>
//       <li>
//         <Link className="nav-link" to="/adminpage">
//           Управление
//         </Link>
//       </li>
//       <li>
//         <Link className="nav-link" to="/login">
//           Вход
//         </Link>
//       </li>
//       <li>
//         <i className="fa-solid fa-phone"></i>
//         8(700) 496-9087
//       </li>
//     </ul>
//     <div className="menu">
//       <label htmlFor="chk1">
//         <i className="fa fa-bars"></i>
//       </label>
//     </div>
//   </header>
// </div>
