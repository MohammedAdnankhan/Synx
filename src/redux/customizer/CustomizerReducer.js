import { UPDATE_CUSTOMIZER_STATE, ACCESS_OPTIONS } from "../constants";

const INIT_STATE = {
  customizerState: false,
  Access: [],
};

const CustomizerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMIZER_STATE:
      return {
        ...state,
        customizerState: !state.customizerState,
      };
    case ACCESS_OPTIONS:
      return {
        ...state,
        Access: action.payload,
      };

    default:
      return state;
  }
};

export default CustomizerReducer;
