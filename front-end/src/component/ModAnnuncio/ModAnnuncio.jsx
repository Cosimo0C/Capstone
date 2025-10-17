import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { apiUrl } from "../../utils/api";

function ModAnnuncio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errore, setErrore] = useState("");
  const { token } = useSelector((state) => state.auth);

  const { annuncio } = location.state || {};
  const [imgAuto, setImgAuto] = useState(annuncio?.imgAuto || [""]);

  const [bodyMod, setBodyMod] = useState({
    titolo: annuncio?.titolo,
    descrizione: annuncio?.descrizione,
    prezzo: annuncio?.prezzo,
    auto: {
      marca: annuncio?.auto?.marca,
      modello: annuncio?.auto?.modello,
      anno: annuncio?.auto?.anno,
      potenza: annuncio?.auto?.potenza,
      cambio: annuncio?.auto?.cambio,
      carburante: annuncio?.auto?.carburante,
      chilometri: annuncio?.auto?.chilometri,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBodyMod({ ...bodyMod, [name]: value });
  };

  const handleAutoChange = (e) => {
    const { name, value } = e.target;
    setBodyMod({
      ...bodyMod,
      auto: { ...bodyMod.auto, [name]: value },
    });
  };

  const handleAggImmagine = () => setImgAuto([...imgAuto, ""]);
  const handleCambioImm = (index, value) => {
    const newImgs = [...imgAuto];
    newImgs[index] = value;
    setImgAuto(newImgs);
  };
  const handleRimImmagine = (index) => {
    setImgAuto(imgAuto.filter((_, i) => i !== index));
  };

  const modifica = async (e) => {
    e.preventDefault();

    if (
      !bodyMod.titolo ||
      !bodyMod.descrizione ||
      !bodyMod.prezzo ||
      !bodyMod.auto.marca ||
      !bodyMod.auto.modello ||
      !bodyMod.auto.anno ||
      !bodyMod.auto.potenza ||
      !bodyMod.auto.cambio ||
      !bodyMod.auto.carburante ||
      !bodyMod.auto.chilometri
    ) {
      toast.error("Compila tutti i campi obbligatori!");
      return;
    }

    const body = {
      titolo: bodyMod.titolo,
      descrizione: bodyMod.descrizione,
      prezzo: parseInt(bodyMod.prezzo, 10),
      auto: {
        marca: bodyMod.auto.marca,
        modello: bodyMod.auto.modello,
        anno: bodyMod.auto.anno,
        potenza: parseInt(bodyMod.auto.potenza, 10),
        cambio: bodyMod.auto.cambio,
        carburante: bodyMod.auto.carburante,
        chilometri: parseInt(bodyMod.auto.chilometri, 10),
      },
      imgAuto: imgAuto.filter((url) => url.trim() !== ""),
    };

    try {
      const resp = await fetch(apiUrl(`/utente/me/modAnnuncio/${annuncio.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const dati = await resp.json();
      if (resp.ok) {
        toast.success("Annuncio modificato con successo!");
        navigate("/MieiAnnunci");
      } else if (dati.errorsList && dati.errorsList.length > 0) {
        dati.errorsList.forEach((err) => toast.error(err));
        setErrore(dati.errorsList.join(", "));
      } else if (dati.msg) {
        toast.error(dati.msg);
        setErrore(dati.msg);
      } else {
        toast.error("Errore nella modifica dell'annuncio");
        setErrore("Errore nella modifica dell'annuncio");
      }
    } catch (err) {
      console.error(err);
      toast.error("Errore di connessione al server");
    }
  };

  if (!annuncio) {
    return <p className="text-light">Nessun annuncio trovato!</p>;
  }

  return (
    <div className="container text-light mt-4">
      <h2>Modifica Annuncio</h2>
      <Form onSubmit={modifica}>
        <Form.Group className="mb-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" name="titolo" value={bodyMod.titolo} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" name="descrizione" value={bodyMod.descrizione} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control type="number" name="prezzo" value={bodyMod.prezzo} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control name="marca" value={bodyMod.auto.marca} onChange={handleAutoChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Modello</Form.Label>
          <Form.Control name="modello" value={bodyMod.auto.modello} onChange={handleAutoChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Anno</Form.Label>
          <Form.Control name="anno" value={bodyMod.auto.anno} onChange={handleAutoChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Potenza (CV)</Form.Label>
          <Form.Control type="number" name="potenza" value={bodyMod.auto.potenza} onChange={handleAutoChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Carburante</Form.Label>
          <Form.Select name="carburante" value={bodyMod.auto.carburante} onChange={handleAutoChange} required>
            <option value="">Seleziona...</option>
            <option value="Benzina">Benzina</option>
            <option value="Diesel">Diesel</option>
            <option value="Elettrico">Elettrico</option>
            <option value="GPL">GPL</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Cambio</Form.Label>
          <Form.Select name="cambio" value={bodyMod.auto.cambio} onChange={handleAutoChange} required>
            <option value="">Seleziona...</option>
            <option value="Manuale">Manuale</option>
            <option value="Automatico">Automatico</option>
            <option value="Sequenziale">Sequenziale</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Chilometri</Form.Label>
          <Form.Control type="number" name="chilometri" value={bodyMod.auto.chilometri} onChange={handleAutoChange} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Immagini (URL)</Form.Label>
          <Form.Text className="text-success d-block mb-2">Accetta solo URL che iniziano con http o https.</Form.Text>
          {imgAuto.map((url, i) => (
            <div key={i} className="d-flex align-items-center mb-2">
              <Form.Control type="url" value={url} onChange={(e) => handleCambioImm(i, e.target.value)} placeholder={`URL immagine ${i + 1}`} />
              <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRimImmagine(i)} type="button">
                <MdDeleteForever />
              </Button>
            </div>
          ))}
          <Button variant="light" className="text-white p-0 my-2" size="sm" onClick={handleAggImmagine} type="button">
            + Aggiungi immagine
          </Button>
        </Form.Group>
        {errore && <div className="alert alert-danger mt-3">{errore}</div>}

        <Button variant="success" type="submit">
          Salva Modifiche
        </Button>
      </Form>
    </div>
  );
}

export default ModAnnuncio;
