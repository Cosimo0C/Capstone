import "./Style/_mieiAnnunci.scss";
import logo from "../../assets/icona.png";
function MieiAnnunci() {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <img src={logo} className="logo" alt="logo" />
      <div className="text-white agata w-75">
        <h1 className="text-light">CarsBuy cos'è?</h1>
        <p className="fs-4">
          Il tuo viaggio inizia qui — tra persone come te. Benvenuto nel marketplace dove le auto usate non sono solo veicoli, ma storie che continuano. Qui
          troverai concessionarie e persone che vendono e acquistano con trasparenza, semplicità e fiducia. Che tu stia cercando la tua prima auto, un modello
          più spazioso per la famiglia, o semplicemente un affare intelligente, questo è il posto giusto. Ogni annuncio è pubblicato direttamente dagli utenti,
          con foto autentiche, descrizioni dettagliate e la possibilità di contattare il venditore in modo diretto. Tu scegli, tu decidi. Naviga tra centinaia
          di offerte, confronta, fai domande e trova l'auto che davvero ti interessa.
        </p>
        <h3 className="text-light">E se vuoi vendere la tua?</h3>
        <p>
          Bastano pochi clic per pubblicare l'annuncio e raggiungere migliaia di potenziali acquirenti. Una community che si muove. Qui ogni persona che
          visiterà il marketplace sarà libera di scegliere qualsiasi cosa inerente all'auto.
        </p>
        <h2 className="text-light">Siamo felici di accorgliela da</h2>
        <h1 className="text-light">CARSBUY</h1>
      </div>
    </div>
  );
}
export default MieiAnnunci;
