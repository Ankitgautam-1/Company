import { combineReducers } from "redux";
import CompanyReducer from "./companyReducer";
const reducer = combineReducers({ CompanyReducer: CompanyReducer });

export default reducer;
