import { BASEURL, token } from "../Global/const";
import { ERROR, SUCCESS } from "../Global/Msg";
import axios from "axios";

export const FACEVERIFICATION = (
  bodyFormData,
  passportData,
  navigate,
  selfie,
  setLoader,
  captureImage,
  Confirmdata,
  passportImg,
  capturedImage
) => {
  let tok = token();

  axios({
    method: "POST",
    url: BASEURL + "verification/selfie",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: bodyFormData,
  })
    .then(function async(response) {
      if (response.data.status == false) {
        ERROR("Verification failed try again.");
        setLoader(false);
      }
      if (response.data.status == true) {
        PASSPORTVERIFICATION(
          passportData,
          navigate,
          selfie,
          setLoader,
          capturedImage,
          Confirmdata,
          passportImg
        );
      }
    })
    .catch(function (error) {
      ERROR("Something went wrong.");
      setLoader(false);
    });
};
export const ALL_IN_ONE_VERIFICATION = (
  bodyFormData,
  navigate,
  selfie,
  setLoader
) => {
  let tok = token();

  axios({
    method: "POST",
    url: BASEURL + "verification",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: bodyFormData,
  })
    .then(function async(response) {
      if (response.data.status == false) {
        ERROR("Verification failed try again.");
        setLoader(false);
      }

      if (response.data.status == true) {
        // console.log(response.data);
        navigate("/confirmation", {
          state: {
            userDetail: response.data.data,
            userImg: selfie,
          },
        });
        setLoader(false);
      }
    })
    .catch(function (error) {
      ERROR("Something went wrong.");
      setLoader(false);
    });
};

export const PASSPORTVERIFICATION = (
  passportData,
  navigate,
  selfie,
  setLoader,
  capturedImage,
  Confirmdata,
  passportImg
) => {
  let tok = token();

  axios({
    method: "POST",
    url: BASEURL + "verification/passport",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: passportData,
  })
    .then(function async(response) {
      if (response.data.status == true) {
        setLoader(false);

        navigate("/confirmation", {
          state: {
            userDetail: response.data.data,
            userImg: selfie,
            capturedImage: capturedImage,
            PassportImag: passportImg,
          },
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      setLoader(false);
      ERROR("Verification failed try again...");
    });
};
export const FACERECORD = (data, navigate) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "verification/liveliness",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: data,
  })
    .then(function async(response) {})
    .catch(function (error) {
      console.log(error);
      ERROR("Verification failed try again.");
    });
};
export const CREATEUSER = (navigate, setDis) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "create",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: data,
  })
    .then(function async(response) {
      if (response.data.status == false) {
        ERROR(response.data.message);
        setDis(false);
      }
      if (response.data.status == true) {
        setDis(false);

        sessionStorage.setItem("UID", response.data.data._id);
        navigate("/select-document");
      }
    })
    .catch(function (error) {
      setDis(false);

      ERROR("Verification failed try again.");
    });
};
export const CREATE_USER = (navigate, setDis, data) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "create",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: data,
  })
    .then(function async(response) {
      if (response.data.status == false) {
        ERROR(response.data.message);
        setDis(false);
      }
      if (response.data.status == true) {
        setDis(false);

        sessionStorage.setItem("UID", response.data.data._id);
        navigate("/face-verification");
      }
    })
    .catch(function (error) {
      setDis(false);

      ERROR("Verification failed try again.");
    });
};
export const CONFRIM_VERIFICATION = (navigate, data, setDis) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "verification/confirm",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: data,
  })
    .then(function async(response) {
      navigate("/completed");
      setDis(false);
    })
    .catch(function (error) {
      setDis(false);
      ERROR("Verification failed try again.");
    });
};
export const UPDATEPASSPORTDETAIL = (navigate, data) => {
  let tok = token();
  axios({
    method: "POST",
    url: BASEURL + "update/passport",
    headers: {
      Authorization: `Bearer ${tok}`,
    },
    data: data,
  })
    .then(function async(response) {
      navigate("/select-document");
      // setDis(false);
    })
    .catch(function (error) {
      // setDis(false);
      ERROR("Verification failed try again.");
    });
};
