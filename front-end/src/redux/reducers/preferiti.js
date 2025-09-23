const initialState = {
  card: {
    preferiti: [],
  },
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PREFERITI":
      console.log("ACTION", action);
      const esiste = state.card.preferiti.some((annuncio) => annuncio.id == action.payload.id);
      if (esiste) {
        alert("è già nei preferiti");
        return state;
      } else {
        return {
          ...state,
          card: {
            ...state.card,
            preferiti: [...state.card.preferiti, action.payload],
          },
        };
      }
    case "REMOVE_PREFERITI":
      console.log("tolto dai preferiti");
      alert("Tolto dai preferiti correttamente!");
      return {
        ...state,
        card: {
          ...state.card,
          preferiti: state.card.preferiti.filter((annuncio) => annuncio.id !== action.payload),
        },
      };
    default:
      return state;
  }
};
export default mainReducer;
