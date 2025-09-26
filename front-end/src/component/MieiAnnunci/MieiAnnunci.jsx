import "./Style/_mieiAnnunci.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Carousel } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import DeleteAnnuncio from "./DeleteAnnuncio";
import CarCard from "../CarCard/CardCard";
function MieiAnnunci() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [dati, setDati] = useState({ content: [] });

  const getMieiAnnunci = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch("http://localhost:8090/utente/me/annunci", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.ok) {
        const json = await resp.json();
        setDati(json);
      } else {
        toast.error("Errore nella fetch!");
      }
    } catch (error) {
      toast.error("Errore di connessione al server!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getMieiAnnunci();
    } else {
      toast.warn("Non puoi accedere se non effettui il login");
    }
  }, []);

  return (
    <div className="m-2">
      {dati.content.length > 0 ? (
        <div className="row justify-content-center">
          {dati.content.map((annuncio) => (
            <div key={annuncio.id} className="col-11 col-sm-11 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex flex-column justify-content-center">
              <CarCard annuncio={annuncio} />
              <DeleteAnnuncio annuncioId={annuncio.id} onDelete={getMieiAnnunci} />
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p className="text-center text-light">Non hai ancora pubblicato nessun annuncio</p>
      )}
    </div>
  );
}

export default MieiAnnunci;

{
  /* <div className="bg-secondary rounded-4 border border-success d-flex flex-column align-items-center pt-2 w-100">
  <Carousel interval={null} slide={false} className="mt-3" controls={null}>
    {annuncio.imgAuto.map((img, j) => (
      <Carousel.Item key={j}>
        <img src={img} alt={`immagine auto ${j}`} id="img-auto" />
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
    <Button variant="secondary" className="text-light fs-5">
      Visualizza auto
    </Button>
    
  </div>
</div>; 
))}
*/
}
