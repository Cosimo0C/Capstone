import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import ComeFunziona from "./component/ComeFunziona/ComeFunziona.jsx";
import MyFooter from "./component/MyFooter/MyFooter.jsx";
import Home from "./component/Home/Home.jsx";
import "./styles/main.scss";

function App() {
  return (
    <div className="bbb">
      <BrowserRouter>
        <div className="page-content">
          <Routes>
            <Route path="/ComeFunziona" element={<ComeFunziona />} />
          </Routes>
          <Home />
        </div>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
