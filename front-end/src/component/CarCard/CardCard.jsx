const CarCard = ({ annunci }) => {
  return (
    <>
      {annunci.map((annuncio, i) => (
        <div key={i}>
          <div>
            <img src={annuncio.imgAuto[0]} alt="" />
          </div>
          <div className="text-light">{annuncio.titolo}</div>
        </div>
      ))}
    </>
  );
};

export default CarCard;
