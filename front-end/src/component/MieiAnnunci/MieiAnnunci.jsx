import "./Style/_mieiAnnunci.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
