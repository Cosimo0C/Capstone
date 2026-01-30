import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Style/_deleteAnnuncio.scss";
import { apiUrl } from "../../utils/api";

function DeleteAnnuncio({ annuncioId, onDelete }) {
  const { token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [errore, setErrore] = useState("");

  const deleteAnnuncio = async () => {
    try {
      const resp = await fetch(apiUrl(`/annunci/${annuncioId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await resp.json().catch(() => ({}));
      if (resp.ok) {
        toast.success("Annuncio eliminato con successo");
        if (onDelete) onDelete();
      } else if (json.errorsList && json.errorsList.length > 0) {
        json.errorsList.forEach((err) => toast.error(err));
        setErrore(json.errorsList.join(", "));
      } else if (json.msg) {
        toast.error(json.msg);
        setErrore(json.msg);
      } else {
        toast.error("Errore nell'eliminazione dell'annuncio!");
        setErrore("Errore nell'eliminazione dell'annuncio!");
      }
    } catch (error) {
      toast.error("Errore di connessione al server!");
      setErrore("Non è stato possibile eliminare l'annuncio.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="bg-transparent border-0 btn-delete">
        <AiFillDelete className="text-alert fs-1" onClick={deleteAnnuncio} />
        {errore && <div className="alert alert-danger mt-3">{errore}</div>}
      </Button>
    </>
  );
}
export default DeleteAnnuncio;
