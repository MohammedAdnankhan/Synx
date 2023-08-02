import { UPDATE_CUSTOMIZER_STATE, ACCESS_OPTIONS } from "../constants";

export const ToggleState = (payload) => ({
  type: UPDATE_CUSTOMIZER_STATE,
  payload,
});
export const SetAccess = (payload) => ({
  type: ACCESS_OPTIONS,
  payload,
});
