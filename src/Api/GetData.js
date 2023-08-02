import axios from "axios";
import { ERROR, SUCCESS } from "../CustomComponent/Msg";
import { baseUrl } from "../Global/Const";

export const Token = JSON.parse(sessionStorage.getItem("Token"));
export function getToken() {
  return JSON.parse(sessionStorage.getItem("Token"));
}
export const GetData = (url, state, token) =>
  axios({
    method: "Get",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      state(response?.data?.data.userList.docs);
    })
    .catch(function (error) {});
export const GetDataDashboardData = (card, token, navigate) =>
  axios({
    method: "Get",
    url: baseUrl + "dashboard",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      if (
        response.data.message ==
        "Your Plan has expired please subscribe to a plan"
      ) {
        ERROR("Your Subcription Expired");
        sessionStorage.clear();
        navigate("/login");
      }
      card(response?.data?.data.cardData);
    })
    .catch(function (error) {});
export const GetUserEditData = (url, tok) =>
  axios({
    method: "Get",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
  })
    .then(function async(response) {
      return response?.data?.data;
    })
    .catch(function (error) {
      return error;
    });
export const GetUserViewData = (url, state, tok) =>
  axios({
    method: "Get",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
  })
    .then(function async(response) {
      state(response?.data?.data);
    })
    .catch(function (error) {});
export const GetEditViewData = (url, tok) =>
  axios({
    method: "Get",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${tok}`,
    },
  })
    .then(function async(response) {
      return response?.data?.data;
    })
    .catch(function (error) {
      return {};
    });
export const GETADMINDATA = (url, state, token) =>
  axios({
    method: "GET",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      state(response?.data?.data);
    })
    .catch(function (error) {});
export const GETADMINAMEEMAIL = (url, token) =>
  axios({
    method: "GET",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      return response;
    })
    .catch(function (error) {});
export const GETVERIFICATIONLINK = (link, token) =>
  axios({
    method: "GET",
    url: baseUrl + "retrive/profile",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      link(response?.data?.data?.admin?.verificationLink);
    })
    .catch(function (error) {});
export const INVITETEAM = (data, Msg, token) =>
  axios({
    method: "POST",
    url: baseUrl + "invite/team",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS(Msg);
      // navigate("/team-management");
    })
    .catch(function (error) {
      ERROR("Something went wrong");
    });
export const TEAMMEMBERREGISTER = (url, data, Msg, navigate) =>
  axios({
    method: "POST",
    url: baseUrl + url,
    headers: {
      // Authorization: `Bearer ${Token}`,
      // Authorization: "",
    },
    data: data,
  })
    .then(function async(response) {
      navigate("/addteam-success");
    })
    .catch(function (error) {
      if (error?.response?.data?.data[0].msg !== undefined) {
        ERROR(error.response.data.data[0]?.msg);
      } else ERROR("Something went wrong");
    });
export const TEAMDETAIL = (state, token) =>
  axios({
    method: "GET",
    url: baseUrl + "team/retrive/all",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      state(response.data.data.docs);
    })
    .catch(function (error) {});

export const GET_TIMELINE_DATA = (url, state, token) =>
  axios({
    method: "GET",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      state(response.data.data);
      //   SUCCESS(Msg);
      // InsertData(response?.data?.data?.graphOrgs);
    })
    .catch(function (error) {});
export const ADD_URL = (data, token, GetUrl) =>
  axios({
    method: "POST",
    url: baseUrl + "addurl",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("URL Added Successfully");
      GetUrl();
    })
    .catch(function (error) {});
export const GET_URL = (token, state) =>
  axios({
    method: "GET",
    url: baseUrl + "URLS",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      state(response.data.data);
    })
    .catch(function (error) {});
export const DEL_URL = (token, data, func) =>
  axios({
    method: "POST",
    url: baseUrl + "deleteurl",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("URL Deleted Successfully");
      func();
    })
    .catch(function (error) {});
export const GetGraphData = (data, token) =>
  axios({
    method: "POST",
    url: baseUrl + "graphData",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      return response?.data?.data?.graphOrgs;
    })
    .catch(function (error) {});
export const ADDROLES = (data, token, navigate) =>
  axios({
    method: "POST",
    url: baseUrl + "createRole",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("Role Added Successfully");
      navigate("/roles-management");
    })
    .catch(function (error) {
      if (error.response.data.data[0].msg) {
        ERROR(error.response.data.data[0].msg);
      } else {
        ERROR("Something went wrong");
      }
    });
export const UPDATEROLES = (data, token, navigate) =>
  axios({
    method: "POST",
    url: baseUrl + "update/role",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("Role Updated Successfully");
      navigate("/roles-management");
    })
    .catch(function (error) {
      if (error.response.data.message) {
        ERROR(error.response.data.message);
      } else {
        ERROR("Something went wrong");
      }
      // if (error?.response?.data?.data[0].msg) {
      //   ERROR(error.response.data.data[0].msg);
      // } else {
      //   ERROR("Something went wrong");
      // }
    });
export const UPDATETEAMMEMBER = (url, data, token, close, func, dis) =>
  axios({
    method: "POST",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("Team Member Updated Successfully");
      func();
      dis(false);
      close(false);
      // func()
    })
    .catch(function (error) {
      dis(false);
      if (error.response.data.message) {
        ERROR(error.response.data.message);
      } else {
        ERROR("Something went wrong");
      }
      // if (error?.response?.data?.data[0].msg) {
      //   ERROR(error.response.data.data[0].msg);
      // } else {
      //   ERROR("Something went wrong");
      // }
    });

export const GETROLES = (state, token) =>
  axios({
    method: "GET",
    url: baseUrl + "role/retrive/all",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      state(response.data.data);
    })
    .catch(function (error) {});
export const GETROLENAME = (token, state) =>
  axios({
    method: "GET",
    url: baseUrl + "role/retrive/names",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      state(response.data.data);
    })
    .catch(function (error) {});
export const GETACCESSROUTES = (token) =>
  axios({
    method: "GET",
    url: baseUrl + "role/retrive/routes",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: data,
  })
    .then(function async(response) {
      // state(response.data.data);
      return response.data.data;
    })
    .catch(function (error) {
      return [];
    });
export const RESETPASSWORD = (token, data) =>
  axios({
    method: "POST",
    url: baseUrl + "change/password",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS("Password Updated Successfully");
    })
    .catch(function (error) {
      if (error?.response?.data?.message) {
        ERROR(error?.response?.data?.message);
      }
      // console.log(error.response);
      else {
        ERROR("Something went wrong");
      }
    });
export const DOWNLOADDETAILS = (token, ID) =>
  axios({
    method: "GET",
    url: baseUrl + `userPdf/${ID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
    // data: data,
  })
    .then(function async(response) {
      // SUCCESS("Password Updated Successfully");
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Summary.pdf"); // Set the desired file name

      // Simulate a click on the anchor element to trigger the download
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    })
    .catch(function (error) {
      if (error?.response?.data?.message) {
        ERROR(error?.response?.data?.message);
      } else {
        ERROR("Something went wrong");
      }
    });

export const GET_FUI_DATA = (token, url) =>
  axios({
    method: "GET",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function async(response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
export const CREATE_FUI_ADMIN = (token, url, data, Msg, fun) =>
  axios({
    method: "POST",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      SUCCESS(Msg);
      fun();
    })
    .catch(function (error) {
      if (error.response.data.message) {
        ERROR(error.response.data.message);
      } else ERROR("Somthing went wrong");
    });
export const Update_Pass = (token, url, data) =>
  axios({
    method: "POST",
    url: baseUrl + url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function async(response) {
      return SUCCESS;
    })
    .catch(function (error) {
      return ERROR("Somthing went wrong");
    });
