import { Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Style/_dettagli.scss";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { LiaTachometerAltSolid } from "react-icons/lia";

function Dettagli() {
  const location = useLocation();
  const { annuncio } = location.state || {};

  if (!annuncio) {
    return <p className="text-light">Nessun annuncio trovato!</p>;
  }
  return (
    <>
      <Carousel interval={null} slide={false} className="mt-3" controls={null}>
        {annuncio.imgAuto.map((img, j) => (
          <Carousel.Item key={j}>
            <img src={img} alt={`immagine auto ${j}`} id="img-auto" className="border border-2 bg-white" />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="m-5">
        <div className="w-100 text-success d-flex justify-content-around">
          <h1>{annuncio.titolo}</h1>
          <h1>{new Intl.NumberFormat("it-IT").format(annuncio.prezzo)} €</h1>
        </div>
        <div className="text-success d-flex flex-column align-items-center w-100 mt-3">
          <h4>Dati principali</h4>
          <div className="d-flex gap-3">
            <div>
              {annuncio.auto.anno}
              <FaRegCalendarAlt />
            </div>
            <div>
              {new Intl.NumberFormat("it-IT").format(annuncio.auto.chilometri)}
              <LiaTachometerAltSolid />
            </div>
            <div>
              {annuncio.auto.carburante}
              <BsFillFuelPumpFill />
            </div>
            <div>
              {annuncio.auto.cambio}
              <FaGear />
            </div>
          </div>
        </div>
        <div className="text-success mt-3">
          <h4>Descizione</h4>
          {annuncio.descrizione}
        </div>
        <div className="text-success mt-5 w-100 d-flex flex-column align-items-center">
          <h4>Scheda tecnica</h4>
          <div className="text-light">
            <h5>Marca: {annuncio.auto.marca}</h5>
            <h5>Modello: {annuncio.auto.modello}</h5>
            <h5>Anno: {annuncio.auto.anno}</h5>
            <h5>Potenza: {annuncio.auto.potenza}</h5>
            <h5>Cambio: {annuncio.auto.cambio}</h5>
            <h5>Carburante: {annuncio.auto.carburante}</h5>
            <h5>Chilometri: {new Intl.NumberFormat("it-IT").format(annuncio.auto.chilometri)}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dettagli;
