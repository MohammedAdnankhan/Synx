import { Callstatus } from "./Action";

const INIT_STATE = {
  CallState: false,
};
const CustomizerReducerCall = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "Calling":
      return {
        ...state,
        CallState: action.payload,
      };

    default:
      return state;
  }
};

export default CustomizerReducerCall;
