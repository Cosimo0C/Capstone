import { Button, Container, Form, InputGroup } from "react-bootstrap";

function Registrazione() {
  return (
    <Container fluid className="d-flex justify-content-center m-4">
      <Form.Group>
        <Form.Group>
          <Form.Label className="text-light fs-4">Nome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-light mt-2 fs-4">Cognome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci il tuo cognome" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-light mt-2 fs-4">Email</Form.Label>
          <Form.Control type="email" placeholder="Inserisci la tua email" required />
          <Form.Text className="text-success">Sarà il tuo Username</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="text-light mt-2 fs-4">Password</Form.Label>
          <Form.Control type="password" placeholder="Inserisci la tua email" required />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="text-light fs-4">Inserisci il tuo numero di telefono</Form.Label>
          <InputGroup>
            <InputGroup.Text>+39</InputGroup.Text>
            <Form.Control type="text" required />
            <Form.Text className="text-success">Il numero dovrà essere attivo e alla portata perchè lì ti contatteranno i possibili acquirenti.</Form.Text>
          </InputGroup>
          <Form.Group className="mt-2">
            <Form.Label className="text-light d-block">Inserisci la tua data di nascita</Form.Label>
            <input type="date" className="w-25" name="Data di nascita" />
          </Form.Group>
        </Form.Group>
        <Form.Select aria-label="Default select example" className="mt-4" required>
          <option>Scegli il che tipo di utente sei</option>
          <option value="PRIVATO">PRIVATO</option>
          <option value="RIVENDITORE">RIVENDITORE</option>
        </Form.Select>
        <Button type="submit" className="bg-light mt-4">
          Regsistrati
        </Button>
      </Form.Group>
    </Container>
  );
}
export default Registrazione;
