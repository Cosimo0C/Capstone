import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import ComeFunziona from "./component/ComeFunziona/ComeFunziona.jsx";
import MyFooter from "./component/MyFooter/MyFooter.jsx";
import Home from "./component/Home/Home.jsx";
import "./styles/main.scss";
import ChiSiamo from "./component/ChiSiamo/ChiSiamo.jsx";

function App() {
  return (
    <div className="bbb">
      <BrowserRouter>
        <MyNavbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ComeFunziona" element={<ComeFunziona />} />
            <Route path="/ChiSiamo" element={<ChiSiamo />} />
          </Routes>
        </div>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
