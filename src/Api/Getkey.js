import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl } from "../Global/Const";
export const Token = JSON.parse(sessionStorage.getItem("Token"));

export function GETKEY(Code, privateKey, status, token) {
  axios({
    method: "Get",
    url: baseUrl + "2FADetails",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      if (response.data.data.twoFAStatus == true) {
        status(true);
      } else {
        Code(response.data.data.qrDetails.QRCodeUrl);
        privateKey(response.data.data.qrDetails.secretKey);
        status(response.data.data.twoFAStatus);
      }

      //   state(response?.data?.data.userList.docs);
    })
    .catch(function (error) {
      //   ERROR("Something went wrong");
    });
}
export function GENERATEQR(QRURL, Secreate, token) {
  axios({
    method: "Get",
    url: baseUrl + "generateNewQr",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      QRURL(response.data.data.QRCodeUrl);
      Secreate(response.data.data.secretKey);
      // state(response.data.data);.
      //   state(response?.data?.data.userList.docs);
    })
    .catch(function (error) {
      //   ERROR("Something went wrong");
    });
}

export const ACTIVATE2FA = (passcode, token) =>
  axios
    .post(
      baseUrl + "activate2FA",

      {
        code: passcode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function async(response) {
      if (response.data.status === false) {
        ERROR("Invalid Code");
      } else {
        SUCCESS("2FA Activated successfully");
      }
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
export const DeActivate2FA = (token, Key) => {
  axios({
    method: "Get",
    url: baseUrl + "deactivate2FA",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      SUCCESS("2FA Deactivated successfully");
      Key();
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
};
export const VERIFY2FALOGIN = (code, token, navigation) => {
  axios({
    method: "POST",
    url: baseUrl + "twoFAOnLogin",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      code: code,
    },
  })
    .then(function async(response) {
      if (response.data.status == false) {
        ERROR("Invalid Code");
      } else {
        sessionStorage.setItem("Token", JSON.stringify(token));
        navigation("/dashboard");
      }
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
};
export const REGENERATE_KEY = (token, setKey, setregenerateKey) => {
  axios({
    method: "GET",
    url: baseUrl + "APIKey/update",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      setregenerateKey(false);
      SUCCESS("Key Generated Successfully");
      setKey(response?.data?.data);
    })
    .catch(function (error) {
      setregenerateKey(false);

      ERROR("Something went wrong");
    });
};
export const DELETE_KEY = (token, setKey) => {
  axios({
    method: "GET",
    url: baseUrl + "APIKey/delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      SUCCESS("Key Deleted Successfully");
      setKey("");
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
};
