import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer/reducer";
const store = configureStore({
  reducer: reducer,
  devTools: composeWithDevTools() as any,
});

export default store;
