import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import "./styles/main.scss";
import ComeFunziona from "./component/ComeFunziona/ComeFunziona.jsx";

function App() {
  return (
    <>
      <div className="bbb">
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/ComeFunziona" element={<ComeFunziona />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
