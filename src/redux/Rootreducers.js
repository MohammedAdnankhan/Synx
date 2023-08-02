import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/CustomizerReducer";
import CustomizerReducerCall from "./Call/CustomReducerCall";

const RootReducers = combineReducers({
  CustomizerReducer,

  cart: CustomizerReducerCall,
});

export default RootReducers;
