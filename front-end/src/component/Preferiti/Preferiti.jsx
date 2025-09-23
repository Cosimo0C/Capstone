import { useDispatch, useSelector } from "react-redux";
import CarCard from "../CarCard/CardCard";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import "./Style/_preferiti.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Preferiti = () => {
  const annunciPref = useSelector((state) => state.pref.preferiti);
  const dispach = useDispatch();
  return (
    <div className="mx-2">
      <div className="d-flex flex-column">
        {annunciPref.map((annuncio) => (
          <div key={annuncio.id} className="d-flex justify-content-around">
            <div className="col-11 col-sm-11 col-md-6 col-lg-4 col-xxl-3 mb-4">
              <CarCard annuncio={annuncio} preferiti={true} />
            </div>
            <Button
              className="w-25"
              onClick={() => {
                dispach({ type: "REMOVE_PREFERITI", payload: annuncio.id });
                toast.info("Rimosso correttamente!");
              }}
            >
              <MdDelete className="fs-1 d-b" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Preferiti;
