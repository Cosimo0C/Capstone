import "./Style/_MyFooter.scss";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
function MyFooter() {
  return (
    <div className="text-success pt-5" id="fot">
      <div className="d-flex justify-content-around">
        <div>
          <h1>CarsBuy</h1>
          <ul className="btn text-success">
            <li>Garanzia</li>
            <li>
              <Link className="btn text-success" to={"/ComeFunziona"}>
                Come funziona
              </Link>
            </li>
            <li>
              <Link className="btn text-success" to={"/ChiSiamo"}>
                Chi siamo
              </Link>
            </li>
            <li>
              <Link className="btn text-success" to={"/Contattaci"}>
                Contattaci
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Sempre con te</h2>
          <ul className="btn text-success">
            <li>
              {" "}
              <AiFillAndroid /> CarsBuy per Android
            </li>
            <li>
              {" "}
              <FaApple /> CarsBuy per iOS
            </li>
            <li>
              <div>
                {" "}
                <FaSquareFacebook /> <FaSquareInstagram /> <FaYoutube /> <FaLinkedin />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="bg-success w-75" style={{ height: "2px" }}></div>
        <div className="d-flex regolazione">
          <p>Copyright 2025 a cura di CarsBuy Tutti i diritti riservati.</p>
          <p className="mx-2">|</p>
          <p>CarsBuy Italia S.p.a. - P. IVA IT03384947891</p>
        </div>
      </div>
    </div>
  );
}
export default MyFooter;
