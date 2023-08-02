import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export function DELETEIT(url, MSG, token, handleTableData) {
  axios({
    method: "Get",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      SUCCESS(MSG);
      handleTableData();
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
}
