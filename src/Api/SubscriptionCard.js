import axios from "axios";
// import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export const GETCARDDATA = (state, setId, token) =>
  axios({
    method: "Get",
    url: baseUrl + "retrive/subScription/all",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      state(response.data.data.SubscriptionList.docs);
      setId(response.data.data.purchasedSubScriptionId);
      // state(response?.data?.data.userList.docs);
    })
    .catch(function (error) {});

export const GETSUBDETAIL = (state, token) =>
  axios({
    method: "Get",
    url: baseUrl + "payHistory",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      state(response.data.data);
    })
    .catch(function (error) {});
