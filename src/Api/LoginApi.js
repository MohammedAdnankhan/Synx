import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl, ERMSG } from "../Global/Const";
export const LoginApi = (
  email,
  pass,
  teamId,
  teamKey,
  navigate,
  setShowLoader
) =>
  axios
    .post(baseUrl + "login", {
      email: email,
      password: pass,
      teamLogin: teamId,
      teamId: teamKey,
    })
    .then(function async(response) {
      sessionStorage.clear();
      setShowLoader(false);

      if (response.data.data.adminStatus == "inactive") {
        navigate("/auth/plans", { state: response.data.data.paymentDetails });
      } else if (
        response.data.message ==
        "Your Plan has expired please subscribe to a plan"
      ) {
        navigate("/auth/plans", { state: response.data.data.paymentDetails });
      } else {
        if (response.data.data.authentication == false) {
          sessionStorage.setItem(
            "Token",
            JSON.stringify(response?.data?.data?.loginToken)
          );
          navigate("/dashboard");
        } else {
          navigate(`/2fa/${response?.data?.data?.loginToken}`);
        }
      }
    })
    .catch(function (error) {
      setShowLoader(false);
      return ERROR("Invalid email or password");
    });
export const SIGNUPAPI = (name, email, pass, navigate) =>
  axios
    .post(baseUrl + "signUp", {
      name: name,
      email: email,
      password: pass,
    })
    .then(function async(response) {
      if (response.data.status) {
        navigate("/auth/plans");
        sessionStorage.setItem("AT", response?.data?.data?.loginToken);
      }
    })
    .catch(function (error) {
      if (error.response?.data?.code == 403) {
        ERROR(error.response.data.data[0].msg);
      } else {
        ERROR("Something went wrong.");
      }
    });
export const GETSUBCARD = (state) =>
  axios
    .get(baseUrl + "subPlans")
    .then(function async(response) {
      state(response.data.plans);
    })
    .catch(function (error) {});
