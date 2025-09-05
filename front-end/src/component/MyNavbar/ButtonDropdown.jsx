import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./Style/_buttonDropdown.scss";
import { Link } from "react-router-dom";

function ButtonDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="d-flex">
      <button className="btn-drop" onClick={toggleDropdown}>
        Aiuto e informazioni {isOpen ? <FaAngleUp className="text-white" /> : <FaAngleDown className="text-white" />}
      </button>
      {isOpen && (
        <div className="drp-menu">
          <ul>
            <li>
              <Link to="/ComeFunziona" className="link-nav">
                Come funziona
              </Link>
            </li>
            <li>
              <Link to="/ChiSiamo" className="link-nav">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link to="/Contattaci" className="link-nav">
                Contattaci
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default ButtonDropdown;
