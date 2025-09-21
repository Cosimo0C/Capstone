import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { BsDot } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import "./Style/_carCard.scss";
const CarCard = ({ annuncio }) => {
  return (
    <div className="bg-secondary rounded-4 border border-success d-flex flex-column align-items-center pt-2 w-100">
      <Carousel interval={null} slide={false} className="mt-3">
        {annuncio.imgAuto.map((img, j) => (
          <Carousel.Item key={j}>
            <img src={img} alt={`immagine auto ${j}`} id="img-auto" /> {/*  /**da risolvere immagini */}
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex flex-column mt-2 w-75">
        <div className="d-flex justify-content-between fs-3 text-light">
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
        <Button variant="secondary">
          {" "}
          <FaHeart className="h-b fs-2" />
        </Button>
        <Button variant="secondary" className="text-light fs-5">
          Visualizza auto
        </Button>
      </div>
    </div>
  );
};

export default CarCard;
