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
      <button className="btn-drop border-0 fs-4" onClick={toggleDropdown}>
        Aiuto e informazioni {isOpen ? <FaAngleUp className="text-white" /> : <FaAngleDown className="text-white" />}
      </button>
      {isOpen && (
        <div className="bg-success p-3 fs-5 rounded-4 position-absolute z-3 text-light" style={{ minWidth: "12rem", top: "100px" }}>
          <ul>
            <li>
              <Link to="/ComeFunziona" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
                Come funziona
              </Link>
            </li>
            <li>
              <Link to="/ComeFunziona" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
                Chi siamo
              </Link>
            </li>
            <li>
              <Link to="/ComeFunziona" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
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
