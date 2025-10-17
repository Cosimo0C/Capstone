import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import CarCard from "../CarCard/CardCard";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [annunci, setAnnunci] = useState([]);

  const getAnnunci = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(apiUrl("/utente/annunci"));
      const dati = await resp.json();
      if (resp.ok) {
        setAnnunci(dati.content);
      } else if (dati.errorsList && dati.errorsList.length > 0) {
        dati.errorsList.forEach((err) => toast.error(err));
        setErrore(dati.errorsList.join(", "));
      } else if (dati.msg) {
        toast.error(dati.msg);
        setErrore(dati.msg);
      } else {
        toast.error("Errore nel caricamento degli annunci!");
        setErrore("Errore nel caricamento degli annunci!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAnnunci();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-success text-center mb-4">Benvenuti!</h1>
      {isLoading && <p className="text-center text-light">Caricamento...</p>}

      {annunci.length > 0 ? (
        <div className="row justify-content-center">
          {annunci.map((annuncio) => (
            <div key={annuncio.id} className="col-11 col-sm-11 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center">
              <CarCard annuncio={annuncio} />
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p className="text-center text-light">Al momento non ci sono annunci. Arrivederci!</p>
      )}
    </div>
  );
};

export default Home;
