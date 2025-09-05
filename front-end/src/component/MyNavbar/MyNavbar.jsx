import "./Style/myNavbar.scss";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ButtonDropdown from "./ButtonDropdown";
import logo from "../../assets/logo.png";
function MyNavbar() {
  return (
    <Container fluid>
      <div className="d-flex p-2 justify-content-between align-items-center flex-wrap">
        <div className="nav-left">
          <div>
            <img src={logo} alt="logo" className="rounded-circle" width={150} />
          </div>
          <button className="btn-nav">Cerca l'auto</button>
          <button className="btn-nav">Vendi la tua auto</button>
          <button className="btn-nav">Garanzia</button>
          <ButtonDropdown />
        </div>
        <div className="nav-right">
          <button className="heart-btn">
            <FaHeart className="icon default" />
            <FaRegHeart className="icon hover" />
          </button>

          <button className="lgn-btn btn btn-success">Login</button>
        </div>
      </div>
    </Container>
  );
}
export default MyNavbar;
