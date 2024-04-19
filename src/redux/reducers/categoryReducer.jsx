import { ADD_CATEGORY, GET_CATEGORY } from "../constants/CategoryConstant";

const initialData = {
  category: [],
};

const categoryReducer = (state = initialData, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
