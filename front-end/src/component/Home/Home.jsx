import { useEffect, useState } from "react";
import CarCard from "../CarCard/CardCard";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [annunci, setAnnunci] = useState([]);

  const getAnnunci = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch("http://localhost:8090/utente/annunci");
      if (resp.ok) {
        const dati = await resp.json();
        setAnnunci(dati.content);
      } else {
        alert("Errore nella fetch");
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
          {annunci.map((annuncio, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
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
