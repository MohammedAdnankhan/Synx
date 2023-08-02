import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export const PaymentApi = (data, Msg) =>
  axios({
    method: "POST",
    url: baseUrl + "create-checkout-session",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS(Msg);
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
