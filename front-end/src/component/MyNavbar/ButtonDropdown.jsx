import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./Style/_ButtonDropdown.scss";
import { Link } from "react-router-dom";

function ButtonDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Chiude il dropdown se clicchi fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex position-relative" ref={dropdownRef}>
      <button className="btn-drop border-0 fs-4" onClick={toggleDropdown}>
        Aiuto e informazioni {isOpen ? <FaAngleUp className="text-white" /> : <FaAngleDown className="text-white" />}
      </button>

      {isOpen && (
        <div className="bg-success p-3 fs-5 rounded-4 position-absolute z-3 text-light" style={{ minWidth: "12rem", top: "3.5rem" }}>
          <ul>
            <li>
              <Link to="/ComeFunziona" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
                Come funziona
              </Link>
            </li>
            <li>
              <Link to="/ChiSiamo" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
                Chi siamo
              </Link>
            </li>
            <li>
              <Link to="/Contattaci" className="text-light text-decoration-none" onClick={() => setIsOpen(false)}>
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
