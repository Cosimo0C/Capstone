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
    <>
      <h1 className="text-success w-100 text-center">Benvenuti!</h1>
      {isLoading && <p className="text-center text-light">Caricamento...</p>}
      <div>
        {annunci.length > 0 ? (
          <div className="d-flex gap-3">
            <CarCard annunci={annunci} />
          </div>
        ) : (
          !isLoading && <p className="text-center text-light">Al momento non ci sono annunci. Arrivederci!</p>
        )}
      </div>
    </>
  );
};

export default Home;
