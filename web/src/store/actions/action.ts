export type Companies = {
  company_id: string;
  company_name: string;
  company_description: string;
  company_contact_number: string;
  company_email: string;
  company_logo: string;
  company_state: string;
  company_city: string;
};

export const INIT_DATA = "INIT_DATA";
export const ADD_COMPANY = "ADD_COMPANY";
export const DELETE_COMPANY = "DELETE_COMPANY";
export const UPDATE_COMPANY = "UPDATE_COMPANY";
const initTheData = (payload: Companies[]) => {
  return {
    type: INIT_DATA,
    payload: payload,
  };
};
const addCompany = (payload: Companies) => {
  return {
    type: ADD_COMPANY,
    payload: payload,
  };
};
const deleteCompany = (payload: number) => {
  return {
    type: DELETE_COMPANY,
    payload: payload,
  };
};
const updateCompany = (payload: Companies) => {
  return {
    type: UPDATE_COMPANY,
    payload: payload,
  };
};

export default initTheData;
export { addCompany, deleteCompany, updateCompany };
