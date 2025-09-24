import { ADD_PREFERITI, REMOVE_PREFERITI } from "../action";

const initialState = {
  preferiti: [],
};
const prefReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PREFERITI:
      console.log("ACTION", action);
      const esiste = state.preferiti.some((annuncio) => annuncio.id == action.payload.id);
      if (esiste) {
        alert("è già nei preferiti");
        return state;
      } else {
        return {
          ...state,
          preferiti: [...state.preferiti, action.payload],
        };
      }
    case REMOVE_PREFERITI:
      console.log("tolto dai preferiti");
      return {
        ...state,
        preferiti: state.preferiti.filter((annuncio) => annuncio.id !== action.payload),
      };
    default:
      return state;
  }
};
export default prefReducer;
