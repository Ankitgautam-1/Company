import {
  ADD_COMPANY,
  Companies,
  DELETE_COMPANY,
  INIT_DATA,
  UPDATE_COMPANY,
} from "../actions/action";

interface Action {
  type: string;
  payload?: any;
}

const CompanyReducer = (state = [], action: Action) => {
  switch (action.type) {
    case INIT_DATA:
      return action.payload;
    case ADD_COMPANY:
      return [...state, action.payload];

    case DELETE_COMPANY:
      return state.filter(
        (company: Companies) => company.company_id !== action.payload
      );

    case UPDATE_COMPANY:
      return state.map((company: Companies) =>
        company.company_id === action.payload.company_id
          ? action.payload
          : company
      );

    default:
      return state;
  }
};

export default CompanyReducer;
