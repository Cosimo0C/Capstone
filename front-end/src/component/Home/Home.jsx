import "./Style/_home.scss";
import { useEffect, useState } from "react";
import { apiUrl } from "../../utils/api";
import CarCard from "../CarCard/CardCard";
import { Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [annunci, setAnnunci] = useState([]);
  const [query, setQuery] = useState("");

  const getAnnunci = async (searchTerm = "") => {
    try {
      const endpoint = searchTerm ? apiUrl(`utente/annunci?search=${encodeURIComponent(searchTerm)}`) : apiUrl("/utente/annunci");

      setIsLoading(true);
      const resp = await fetch(endpoint);
      const dati = await resp.json();

      if (resp.ok) {
        setAnnunci(dati.content || []);
      } else if (dati.errorsList && dati.errorsList.length > 0) {
        dati.errorsList.forEach((err) => toast.error(err));
      } else if (dati.msg) {
        toast.error(dati.msg);
      } else {
        toast.error("Errore nel caricamento degli annunci!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAnnunci(query);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="container my-4">
      <h1 className="text-success text-center mb-4">Benvenuti!</h1>

      {/* Campo di ricerca */}
      <div className="d-flex align-items-center justify-content-center w-100 px-4">
        <Form className="mb-4 w-75">
          <Form.Control type="text" placeholder="Cerca un'auto per marca, modello o descrizione..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </Form>

        {isLoading && (
          <div className="text-center text-light spin">
            <Spinner animation="border" variant="light" />
          </div>
        )}
      </div>
      {/* Lista annunci */}
      {annunci.length > 0 ? (
        <div className="row justify-content-center">
          {annunci.map((annuncio) => (
            <div key={annuncio.id} className="col-11 col-sm-11 col-md-6 col-lg-4 col-xxl-3 mb-4 d-flex justify-content-center">
              <CarCard annuncio={annuncio} />
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-light">{query ? `Nessun risultato trovato per "${query}"` : "Al momento non ci sono annunci. Arrivederci!"}</p>
        )
      )}
    </div>
  );
};

export default Home;
