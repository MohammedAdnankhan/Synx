import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl, ERMSG } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export const UpdateProfileApi = (
  data,
  Msg,
  token,
  handleClick,
  setdis,
  setDisable
) =>
  axios({
    method: "POST",
    url: baseUrl + "update/profile",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS(Msg);
      handleClick();
      setdis(true);
      setDisable(false);
    })
    .catch(function (error) {
      ERROR("Somthing went wrong");
      setdis(true);
      setDisable(false);
    });
export const DATARETENTIONAPI = (data, Msg, token) =>
  axios({
    method: "POST",
    url: baseUrl + "update/retentionPeriod",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS(Msg);
    })
    .catch(function (error) {
      ERROR("Somthing went wrong");
    });
