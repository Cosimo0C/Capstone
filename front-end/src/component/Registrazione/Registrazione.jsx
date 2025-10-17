import { useState } from "react";
import { apiUrl } from "../../utils/api";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Registrazione() {
  const [isLoading, setIsLoading] = useState(false);
  const [errore, setErrore] = useState("");
  const [mostraPass, setMostraPass] = useState(false);

  const navigate = useNavigate();

  const handleOk = () => navigate("/");

  const createUtente = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrore("");

    const body = {
      nome: e.target.nome.value,
      cognome: e.target.cognome.value,
      email: e.target.email.value,
      password: e.target.password.value,
      numCellulare: e.target.numCellulare.value,
      dataNascita: e.target.dataNascita.value,
      tipo: e.target.tipo.value,
    };

    if (body.password.length < 6) {
      toast.error("La password deve avere almeno 6 caratteri");
      setIsLoading(false);
      return;
    }

    try {
      const resp = await fetch(apiUrl("/auth/registrazione"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const dati = await resp.json();
      if (resp.ok) {
        toast.success("Registrazione avvenuta con successo!");
        e.target.reset();
        setTimeout(() => handleOk(), 2000);
      } else if (dati.errorsList && dati.errorsList.length > 0) {
        dati.errorsList.forEach((err) => toast.error(err));
        setErrore(dati.errorsList.join(", "));
      } else if (dati.msg) {
        toast.error(dati.msg);
        setErrore(dati.msg);
      } else {
        toast.error("Errore nella registrazione!");
        setErrore("Errore nella registrazione!");
      }
    } catch (error) {
      toast.error(error.message);
      setErrore("Impossibile contattare il server! Riprova più tardi!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center m-4">
      <Form onSubmit={createUtente}>
        <Form.Text className="text-success fs-5">TUTTI I CAMPI SONO OBBLIGATORI!</Form.Text>

        <Form.Group>
          <Form.Label className="text-light fs-4">Nome</Form.Label>
          <Form.Control name="nome" type="text" placeholder="Inserisci il tuo nome" required />
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-light mt-2 fs-4">Cognome</Form.Label>
          <Form.Control name="cognome" type="text" placeholder="Inserisci il tuo cognome" required />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-light mt-2 fs-4">Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Inserisci la tua email" required />
          <Form.Text className="text-success">Sarà il tuo Username</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="text-light mt-2 fs-4">Password</Form.Label>
          <div className="d-flex">
            <Form.Control name="password" type={mostraPass ? "text" : "password"} placeholder="Inserisci la tua password" required />
            <Button variant="outline-light" className="border-0" onClick={() => setMostraPass(!mostraPass)} type="button">
              {mostraPass ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label className="text-light fs-4">Inserisci il tuo numero di telefono</Form.Label>
          <InputGroup>
            <InputGroup.Text>+39</InputGroup.Text>
            <Form.Control name="numCellulare" type="text" required />
            <Form.Text className="text-success">Il numero dovrà essere attivo e alla portata perchè lì ti contatteranno i possibili acquirenti.</Form.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label className="text-light d-block">Inserisci la tua data di nascita</Form.Label>
          <input type="date" className="w-25" name="dataNascita" required />
        </Form.Group>

        <Form.Select name="tipo" aria-label="Default select example" className="mt-4" required>
          <option value="">Scegli che tipo di utente sei</option>
          <option value="PRIVATO">PRIVATO</option>
          <option value="RIVENDITORE">RIVENDITORE</option>
        </Form.Select>
        <Form.Check className="text-success mt-3" label="Consenso nel mostrare il numero di cellulare per essere contattato" required />
        {errore && <div className="alert alert-danger mt-3">{errore}</div>}

        {isLoading ? (
          <Spinner animation="border" variant="success" />
        ) : (
          <Button type="submit" className="bg-light mt-4">
            Registrati
          </Button>
        )}
      </Form>
    </Container>
  );
}
export default Registrazione;
