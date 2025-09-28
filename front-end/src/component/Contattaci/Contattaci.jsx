import { Card } from "react-bootstrap";

function Contattaci() {
  return (
    <div className="w-100">
      <div className="text-light d-flex flex-column align-items-center">
        <h1>Contattaci</h1>
        <p className="fs-4 text-success">
          Siamo qui per te! Contattaci per informazioni sugli annunci o sui nostri servizi per le aziende, o per qualsiasi altra domanda tu possa avere.
        </p>
      </div>
      <div className="d-flex flex-column align-items-center mt-5 cell">
        <Card className="bg-primary border-2 border-success d-flex align-items-center w-50 mt-3">
          <Card.Title className="text-light mt-3">Chiamaci</Card.Title>
          <Card.Body className="text-success">
            Il nostro team di assistenza al cliente è pronto ad aiutarti per qualsiasi domanda dal lunedì al venerdi, dalle 08:00 alle 20:00.
          </Card.Body>
          <p className="fs-3 text-success">+39 0964 354685</p>
        </Card>
        <Card className="bg-primary border-2 border-success d-flex align-items-center w-50 mt-3">
          <Card.Title className="text-light mt-3">Compila il modulo per inviarci un messaggio</Card.Title>
          <Card.Body className="text-success">Mandaci la tua richiesta, risponderemo al più presto con tutte le informazioni di cui hai bisogno</Card.Body>
          <p className="fs-3 text-success">carsbuystaff@gmail.com</p>
        </Card>
      </div>
    </div>
  );
}
export default Contattaci;
