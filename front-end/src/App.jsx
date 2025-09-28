import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import ComeFunziona from "./component/ComeFunziona/ComeFunziona.jsx";
import MyFooter from "./component/MyFooter/MyFooter.jsx";
import Home from "./component/Home/Home.jsx";
import "./Styles/main.scss";
import ChiSiamo from "./component/ChiSiamo/ChiSiamo.jsx";
import MieiAnnunci from "./component/MieiAnnunci/MieiAnnunci.jsx";
import Preferiti from "./component/Preferiti/Preferiti.jsx";
import Registrazione from "./component/Registrazione/REgistrazione.jsx";
import Contattaci from "./component/Contattaci/Contattaci.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendiLaTuaAuto from "./component/VendiLaTuaAuto/VendiLaTuaAuto.jsx";
import Dettagli from "./component/Dettagli/Dettagli.jsx";
import ModAnnuncio from "./component/ModAnnuncio/ModAnnuncio.jsx";

function App() {
  return (
    <div className="bbb">
      <BrowserRouter>
        <MyNavbar />
        <div className="page-content">
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ComeFunziona" element={<ComeFunziona />} />
            <Route path="/ChiSiamo" element={<ChiSiamo />} />
            <Route path="/MieiAnnunci" element={<MieiAnnunci />} />
            <Route path="/Preferiti" element={<Preferiti />} />
            <Route path="/Registrazione" element={<Registrazione />} />
            <Route path="/Contattaci" element={<Contattaci />} />
            <Route path="/VendiLaTuaAuto" element={<VendiLaTuaAuto />} />
            <Route path="/Dettagli" element={<Dettagli />} />
            <Route path="/ModAnnuncio" element={<ModAnnuncio />} />
          </Routes>
        </div>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
