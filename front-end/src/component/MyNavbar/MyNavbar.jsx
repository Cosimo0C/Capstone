import "./Style/_MyNavbar.scss";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonDropdown from "./ButtonDropdown";
import logo from "../../assets/icona.png";
import { Link } from "react-router-dom";
function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-primary p-0">
      <Container fluid className="d-flex p-2 justify-content-between align-items-center flex-wrap m-0">
        <Navbar.Brand className="d-flex align-items-center gap-sm-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="rounded-circle" width="100px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="d-flex justify-content-between w-100">
            <Nav className="gap-4">
              <button className="btn-nav border-0 fs-4 fw-medium">Cerca l'auto</button>
              <button className="btn-nav border-0 fs-4 fw-medium">Vendi la tua auto</button>
              <button className="btn-nav border-0 fs-4 fw-medium">Garanzia</button>
              <ButtonDropdown />
            </Nav>
            <Nav className="d-flex align-items-center gap-sm-4 flex-row">
              <button className="heart-btn btn d-flex alig-items-center justify-content-center position-relative bg-transparent border-0">
                <FaHeart className="icon default" />
                <FaRegHeart className="icon hover" />
              </button>
              <button className="lgn-btn rounded-pill p-2 fw-medium fs-5">Login</button>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
