import { BASEURL, token } from "../Global/const";
import { ERROR, SUCCESS } from "../Global/Msg";
import axios from "axios";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyIiwic3ViIjp7Im9yZ2FuaXphdGlvbk5hbWUiOiJKb2siLCJvcmdhbmlzYXRpb25NYWlsIjoiamtAZ21haWwuY29tIiwiX2lkIjoiNjQ0MTAxYmYzODMwYTljOGQzNjkxYmYyIn0sImlhdCI6MTY4MTk4MTg4NzQ3MCwiZXhwIjoxNjg0NTczODg3NDcwfQ.wqqrl4Gnw-0sHUMzSY4wmeUED7jAN-qsh3fK2RuAOHg";

export const LIVELINESSAPI = (formData, Tok, msg, navigate, setDis) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "verification/liveliness",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: formData.current,
  })
    .then(function async(response) {
      console.log(response.data);
      if (response.data.status == false) {
        ERROR(response.data.message);
        setDis(false);
      }
      // if (response.data.status == 401) {

      // }
      if (response.data.status == true) {
        // SUCCESS(msg);
        navigate("/confirm-verification");
        setDis(false);
      }
      //   SUCCESS(msg);
      setDis(false);
    })
    .catch(function (error) {
      console.log(error);
      ERROR("Verification failed try again.");
      setDis(false);
    });
};
