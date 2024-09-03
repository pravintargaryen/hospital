import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Fragment>
      <Navbar expand="lg" className=" shadow-sm p-3 mb-5 bg-secondary">
        <Container>
          <Navbar.Brand className="text-muted text-4xl">
            <Link to="/" className="nav-link" style={{ color: "pink" }}>
              Emergency
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-dark ">
                <Link
                  to="/blood"
                  className="nav-link"
                  style={{ color: "pink" }}
                >
                  Blood
                </Link>
              </Nav.Link>
              <Nav.Link className="text-dark">
                <Link
                  to="/pharmacy"
                  className="nav-link"
                  style={{ color: "pink" }}
                >
                  Pharmacy
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
