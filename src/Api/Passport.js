import { BASEURL } from "../Global/const";
import { ERROR, SUCCESS } from "../Global/Msg";
import axios from "axios";
export const PASSPORTVERIFICATION = (data, msg) =>
  axios({
    method: "POST",
    url: BASEURL + "verification/passport",
    headers: {
      //   Authorization: `Bearer ${Token}`,
    },
    data: data,
  })
    .then(function async(response) {
      console.log(response.data);
      // if (response.data.status == false) {
      //   ERROR("Verification failed try again.");
      // }
      //   SUCCESS(msg);
    })
    .catch(function (error) {
      console.log(error.response);
    });
