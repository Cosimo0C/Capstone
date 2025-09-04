import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./Style/_ButtonDropdown.scss";
import { Link } from "react-router-dom";

function ButtonDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <button className="btn-drop pt-2" onClick={toggleDropdown}>
        Aiuto e informazioni {isOpen ? <FaAngleUp className="text-white" /> : <FaAngleDown className="text-white" />}
      </button>

      {isOpen && (
        <div className="drp-menu">
          <ul>
            <li>
              <Link to="/ComeFunziona">Come funziona</Link>
            </li>
            <li>Chi siamo</li>
            <li>Contattaci</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default ButtonDropdown;
