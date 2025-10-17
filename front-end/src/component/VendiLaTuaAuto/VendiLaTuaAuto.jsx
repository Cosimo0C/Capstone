import { useSelector } from "react-redux";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { apiUrl } from "../../utils/api";

function VendiLaTuaAuto() {
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [errore, setErrore] = useState("");
  const [imgAuto, setImgAuto] = useState([""]);

  const handleAggImmagine = () => setImgAuto([...imgAuto, ""]);

  const handleCambioImm = (index, value) => {
    const newImgs = [...imgAuto];
    newImgs[index] = value;
    setImgAuto(newImgs);
  };

  const handleRimImmagine = (index) => {
    setImgAuto(imgAuto.filter((_, i) => i !== index));
  };

  const creaAnnuncio = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrore("");

    const body = {
      titolo: e.target.titolo.value,
      descrizione: e.target.descrizione.value,
      prezzo: parseInt(e.target.prezzo.value, 10),
      auto: {
        marca: e.target.marca.value,
        modello: e.target.modello.value,
        anno: e.target.anno.value,
        potenza: parseInt(e.target.potenza.value, 10) || 0,
        cambio: e.target.cambio.value,
        carburante: e.target.carburante.value,
        chilometri: parseInt(e.target.chilometri.value, 10) || 0,
      },
      imgAuto: imgAuto.filter((url) => url.trim() !== ""),
    };

    try {
      const resp = await fetch(apiUrl("/utente/me/creoAnnuncio"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const dati = await resp.json();

      if (resp.ok) {
        toast.success("Annuncio pubblicato con successo!");
        e.target.reset();
        setImgAuto([""]);
      } else if (dati.errorsList && dati.errorsList.length > 0) {
        dati.errorsList.forEach((err) => toast.error(err));
        setErrore(dati.errorsList.join(", "));
      } else if (dati.msg) {
        toast.error(dati.msg);
        setErrore(dati.msg);
      } else {
        toast.error("Errore nella pubblicazione dell'annuncio!");
        setErrore("Errore nella pubblicazione dell'annuncio!");
      }
    } catch (error) {
      toast.error("Errore di connessione al server!");
      setErrore("Non è stato possibile pubblicare l'annuncio.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-5">
        <h2 className="text-success">Devi essere loggato per pubblicare un annuncio!</h2>
      </Container>
    );
  }

  return (
    <Container fluid className="d-flex justify-content-center m-4">
      <Form className="w-50" onSubmit={creaAnnuncio}>
        <Form.Group>
          <Form.Label className="text-light fs-3">Titolo</Form.Label>
          <Form.Control name="titolo" placeholder="Inserisci il titolo dell'annuncio" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Descrizione</Form.Label>
          <Form.Control as="textarea" name="descrizione" rows={3} placeholder="Inserisci la descrizione" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Prezzo</Form.Label>
          <Form.Control type="number" name="prezzo" min="0" placeholder="Inserisci il prezzo" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Marca</Form.Label>
          <Form.Control name="marca" placeholder="Marca auto" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Modello</Form.Label>
          <Form.Control name="modello" placeholder="Modello auto" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Anno</Form.Label>
          <Form.Control name="anno" placeholder="Anno auto" required />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Potenza (CV)</Form.Label>
          <Form.Control type="number" name="potenza" min="0" placeholder="Potenza" />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Carburante</Form.Label>
          <Form.Select name="carburante" required>
            <option>Seleziona...</option>
            <option value="Benzina">Benzina</option>
            <option value="Diesel">Diesel</option>
            <option value="Elettrico">Elettrico</option>
            <option value="GPL">GPL</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Cambio</Form.Label>
          <Form.Select name="cambio" required>
            <option>Seleziona...</option>
            <option value="Manuale">Manuale</option>
            <option value="Automatico">Automatico</option>
            <option value="Sequenziale">Sequenziale</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Chilometri</Form.Label>
          <Form.Control type="number" name="chilometri" min="0" placeholder="Chilometri" />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="text-light fs-3">Immagini (URL)</Form.Label>
          <Form.Text className="text-success">Accetta solo URL che iniziano con http o https.</Form.Text>
          {imgAuto.map((url, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <Form.Control type="url" value={url} onChange={(e) => handleCambioImm(index, e.target.value)} placeholder={`URL immagine ${index + 1}`} />
              <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRimImmagine(index)} type="button">
                <MdDeleteForever />
              </Button>
            </div>
          ))}
          <Button variant="light" className="text-white p-0 mt-2" size="sm" onClick={handleAggImmagine} type="button">
            + Aggiungi immagine
          </Button>
        </Form.Group>
        {errore && <div className="alert alert-danger mt-3">{errore}</div>}

        {isLoading ? (
          <Spinner animation="border" variant="success" className="mt-3" />
        ) : (
          <Button type="submit" className="mt-3 text-white" variant="light">
            Pubblica annuncio
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default VendiLaTuaAuto;
