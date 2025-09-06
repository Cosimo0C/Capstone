import "./style/_myFooter.scss";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
function MyFooter() {
  return (
    <div className="text-success pt-5" id="fot">
      <div className="d-flex justify-content-around">
        <div>
          <h1>CarsBuy</h1>
          <ul>
            <li>Garanzia</li>
            <li>Come funziona</li>
            <li>Chi siamo</li>
            <li>Contattaci</li>
          </ul>
        </div>
        <div>
          <h2>Sempre con te</h2>
          <ul>
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
        <div>
          <p>Copyright 2025 a cura di CarsBuy Tutti i diritti riservati. | CarsBuy Italia S.p.a. - P. IVA IT03384947891</p>
        </div>
      </div>
    </div>
  );
}
export default MyFooter;
