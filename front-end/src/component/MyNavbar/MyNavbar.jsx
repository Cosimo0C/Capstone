import "./Style/_MyNavbar.scss";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ButtonDropdown from "./ButtonDropdown";
function MyNavbar() {
  return (
    <Container fluid>
      <div className="d-flex pe-5">
        <div className="d-flex">
          <div>
            {/* <img src="favin.ico.jpg" alt="logo" width={50} height={50} /> */}
            <h1 className="text-light">CarsBuy</h1>
          </div>
          <button className="btn-nav">Cerca l'auto</button>
          <button className="btn-nav">Vendi la tua auto</button>
          <button className="btn-nav">Garanzia</button>
          <ButtonDropdown />
        </div>
        <button className="heart-btn">
          <FaHeart className="icon default" />
          <FaRegHeart className="icon hover" />
        </button>
        <div></div>
      </div>
    </Container>
  );
}
export default MyNavbar;
