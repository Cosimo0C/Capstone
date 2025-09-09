import "./Style/_MyNavbar.scss";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ButtonDropdown from "./ButtonDropdown";
import logo from "../../assets/icona.png";
import { Link } from "react-router-dom";
function MyNavbar() {
  return (
    <Container fluid>
      <div className="d-flex p-2 justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center gap-sm-4">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="logo" className="rounded-circle" width={150} />
            </Link>
          </div>
          <button className="btn-nav border-0 fs-4 fw-medium">Cerca l'auto</button>
          <button className="btn-nav border-0 fs-4 fw-medium">Vendi la tua auto</button>
          <button className="btn-nav border-0 fs-4 fw-medium">Garanzia</button>
          <ButtonDropdown />
        </div>
        <div className="d-flex align-items-center gap-sm-4">
          <button className="heart-btn btn d-flex alig-items-center justify-content-center position-relative bg-transparent border-0">
            <FaHeart className="icon default" />
            <FaRegHeart className="icon hover" />
          </button>

          <button className="lgn-btn rounded-pill p-2 fw-medium fs-5">Login</button>
        </div>
      </div>
    </Container>
  );
}
export default MyNavbar;
