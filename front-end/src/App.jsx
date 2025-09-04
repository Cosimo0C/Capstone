import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./component/MyNavbar/MyNavbar.jsx";
import "./styles/main.scss";
import ComeFunziona from "./component/ComeFunziona/ComeFunziona.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/ComeFunziona" element={<ComeFunziona />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
