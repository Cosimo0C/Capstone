import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { BsDot } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import "./Style/_carCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_PREFERITI } from "../../redux/action";
import { Link } from "react-router-dom";

const CarCard = ({ annuncio, preferiti }) => {
  const dispach = useDispatch();
  const annunciPref = useSelector((state) => state.pref.preferiti);

  const handlePref = (annuncio) => {
    if (annunciPref.some((a) => a.id == annuncio.id)) {
      toast.warn("è già nei preferiti");
    } else {
      dispach({ type: ADD_PREFERITI, payload: annuncio });
      toast.success("Aggiunto ai preferiti!");
    }
  };

  return (
    <div className="bg-secondary rounded-4 border border-success d-flex flex-column align-items-center pt-2 w-100">
      <Carousel interval={null} slide={false} className="mt-3" controls={null}>
        {annuncio.imgAuto.map((img, j) => (
          <Carousel.Item key={j}>
            <img src={img} alt={`immagine auto ${j}`} id="img-auto" />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex flex-column mt-2 w-75">
        <div className="d-flex justify-content-between fs-2 text-light">
          <div>{annuncio.titolo}</div>
          <div>{new Intl.NumberFormat("it-IT").format(annuncio.prezzo)} €</div>
        </div>
        <div className="text-success">
          <div className="d-flex align-items-center">
            <div>{annuncio.auto.anno}</div>
            <BsDot />
            <div>{annuncio.auto.carburante}</div>
            <BsDot />
            <div>{new Intl.NumberFormat("it-IT").format(annuncio.auto.chilometri)} km</div>
          </div>
          <div>{annuncio.auto.cambio}</div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end w-75 m-2">
        {!preferiti && (
          <Button variant="secondary" onClick={() => handlePref(annuncio)}>
            {" "}
            <FaHeart className="h-b fs-2" />
          </Button>
        )}
        <Link to={"/Dettagli"} state={{ annuncio }} className="text-decoration-none text-light fs-5 visualizza">
          Visualizza auto
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
