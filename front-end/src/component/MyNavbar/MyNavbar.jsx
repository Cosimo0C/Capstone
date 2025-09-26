import "./Style/_MyNavbar.scss";
import { Alert, Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonDropdown from "./ButtonDropdown";
import logo from "../../assets/icona.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../redux/action";

function MyNavbar() {
  const [mostraLogin, setMostraLogin] = useState(false);
  const [errore, setErrore] = useState("");
  const [loading, setLoading] = useState(false);
  const [seiLoggato, setSeiLoggato] = useState(false);
  const [mostraPass, setMostraPass] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setSeiLoggato(true);
  }, []);

  const handleChiudi = () => {
    setMostraLogin(false);
    setErrore("");
    setMostraPass(false);
  };

  const handleApri = () => setMostraLogin(true);

  const handleInviaLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrore("");

    const email = e.target.username.value;
    const password = e.target.password.value;

    try {
      const resp = await fetch("http://localhost:8090/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const dati = await resp.json();
      {
        console.log(email);
        console.log(password);
        console.log(dati);
      }
      if (resp.ok) {
        toast.success("Login effettuato con successo!");
        localStorage.setItem("token", dati.accT);
        setSeiLoggato(true);
        dispatch(loginSuccess(dati.accT));
        handleChiudi();
      } else {
        toast.error("Errore login!");
        setErrore(dati.messagge || "Errore login");
      }
    } catch (error) {
      console.log(error);
      setErrore("Impossibile Conttare il server! Riprova più tardi!");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setSeiLoggato(false);
    toast.info("Logout effettuato");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-primary p-0">
        <Container fluid className="d-flex p-2 justify-content-between align-items-center flex-wrap m-0">
          <Navbar.Brand className="d-flex align-items-center gap-sm-4">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="rounded-circle" width="100px" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="d-flex justify-content-between w-100">
              <Nav className="gap-4">
                <Link className="btn-nav border-0 fs-4 fw-medium text-decoration-none p-2" to={"/"}>
                  Cerca l'auto
                </Link>
                <Link className="btn-nav border-0 fs-4 fw-medium text-decoration-none p-2" to={"/VendiLaTuaAuto"}>
                  Vendi la tua auto
                </Link>
                {seiLoggato && (
                  <Link className="btn-nav border-0 fs-4 fw-medium text-decoration-none p-2" to={"/MieiAnnunci"}>
                    I miei annunci
                  </Link>
                )}
                <ButtonDropdown />
              </Nav>
              <Nav className="d-flex align-items-center gap-sm-4 flex-row">
                {seiLoggato && (
                  <Link className="heart-btn btn d-flex alig-items-center justify-content-center position-relative bg-transparent border-0" to={"/Preferiti"}>
                    <FaHeart className="icon default" />
                    <FaRegHeart className="icon hover" />
                  </Link>
                )}
                {seiLoggato ? (
                  <button className="lgn-btn rounded-pill p-2 fw-medium fs-5" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button className="lgn-btn rounded-pill p-2 fw-medium fs-5" onClick={handleApri}>
                    Login
                  </button>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={mostraLogin} onHide={handleChiudi} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errore && <Alert variant="danger">{errore}</Alert>}
          <Form onSubmit={handleInviaLogin}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Inserisci username" name="username" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control type={mostraPass ? "text" : "password"} placeholder="Inserisci password" name="password" required />
                <Button variant="outline-light" onClick={() => setMostraPass(!mostraPass)} type="button">
                  {mostraPass ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 butt" disabled={loading}>
              {loading ? "Caricamento..." : "Accedi"}
            </Button>
            <Button variant="light" className="w-100 mt-2 text-white butt" onClick={handleChiudi}>
              <Link className="text-decoration-none text-white" to={"/Registrazione"}>
                Registrati
              </Link>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default MyNavbar;
